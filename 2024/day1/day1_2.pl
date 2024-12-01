open(FH, '<', 'input.txt') or die $!;
my @lefties = ();
my %righties = ();
while(<FH>){
    chomp;
    my $left = $_;
    $left =~ s/ *[0-9]+$//;
    my $right = $_;
    $right =~ s/^[0-9]+ *//;
    push @lefties, $left;
    if ($righties{$right}){
        $righties{$right}++;
    }else{
        $righties{$right} = 0;
        $righties{$right}++;
    }
}

my $count = 0;
for my $k (@lefties){
    if ($righties{$k}){
        $count += $k * $righties{$k};
    }
}
print "count: $count\n";
close FH;