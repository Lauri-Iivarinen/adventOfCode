class visualize_d9:
    def __init__(self, coords, pairing):
        # debugging tool which draws the area and the biggest square, this was quite helpful:D
        import pygame # import here so it does not affect processing times untill called
        pygame.init()
        screen = pygame.display.set_mode((800, 800))
        running = True
        pt = coords
        while running:
        # poll for events
        # pygame.QUIT event means the user clicked X to close your window
            pts = [(pt[0][0], pt[0][1])    ,(pt[0][0],pt[1][1]),    (pt[1][0],pt[1][1]),    (pt[1][0],pt[0][1])]
            pts = list(map(lambda x: (float(x[0])/150,float(x[1])/150,), pts))
            pygame.draw.polygon(screen,(200,0,0),pts)
            for k,v in pairing.items():
                x,y = k.split(',')
                x2,y2 = v[0]
                pygame.draw.line(screen,(200,200,200),(float(x)/150,float(y)/150),(float(x2)/150,float(y2)/150),3)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
            pygame.display.flip()