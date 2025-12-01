class fh:
    lines = []
    def __init__(self, fn):
        with open(fn) as text:
            self.lines = list(map(lambda x: x.replace('\n', ''), text.readlines()))
        text.close()
    
    def get_rows(self):
        return self.lines
    
    def get_str(self):
        return "\n".join(self.lines)
        