#!/usr/bin/perl

open(FH, '<', 'input.txt') or die $!;
my @lefties = ();
my @righties = ();
while(<FH>){
    chomp;
    my $left = $_;
    $left =~ s/ *[0-9]+$//;
    my $right = $_;
    $right =~ s/^[0-9]+ *//;
    push @lefties, $left;
    push @righties, $right;
}
close FH;
@lefties = sort @lefties;
@righties = sort @righties;
my $len = @lefties;

my $distance = 0;

for (my $i = 0; $i < $len; $i++){
    if ($lefties[$i] > $righties[$i]){
        $distance += $lefties[$i] - $righties[$i];
    }else {
        $distance += $righties[$i] - $lefties[$i];
    }
}

print "distance: $distance\n";