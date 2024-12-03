#!/usr/bin/perl
open(FH, '<', 'input.txt') or die $!;
my $sum = 0;
for my $i (((join "" , ((join "" , <FH>) =~ m/(mul\([0-9]+,[0-9]+\))/g)) =~ s/mul\(//rg) =~ m/[0-9]+,[0-9]+/g){
    my @a = $i =~ m/[0-9]+/g;
    $sum += $a[0]*$a[1];
}
die "$sum\n";