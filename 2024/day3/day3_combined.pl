#!/usr/bin/perl
open(FH, '<', 'input.txt') or die $!;
my $sum = (0,0);
my $str = join "" , <FH>;
for my $i ($str =~ m/(mul\([0-9]+,[0-9]+\))/g) {
    my @a = $i =~ m/[0-9]+/g;
    $sum[0] += $a[0]*$a[1];
}
for my $i ($str =~ s/\R//rg =~ s/don\'t\(\).*?do\(\)//rg =~ m/(mul\([0-9]+,[0-9]+\))/g) {
    my @a = $i =~ m/[0-9]+/g;
    $sum[1] += $a[0]*$a[1];
}
print "pt1: $sum[0]\npt2: $sum[1]\n";