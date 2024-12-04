#!/usr/bin/perl
open(FH, '<', 'input.txt') or die $!;
my $sum = 0;
my @rows = ();
foreach my $r (<FH>) {
    my @sub_r = split "", "...$r...";
    push @rows, \@sub_r;
}

my @filler = split "" ,"." x @{$rows[0]};
@rows = (\@filler, \@filler, \@filler, \@filler , @rows, \@filler, \@filler, \@filler, \@filler);

for (my $r = 0; $r < @{$rows[0]}; $r++){
    for (my $c = 0; $c < @rows; $c++){
        if ($rows[$r][$c] eq "X"){
            my $str = "$rows[$r][$c]$rows[$r][$c-1]$rows[$r][$c-2]$rows[$r][$c-3],$rows[$r][$c]$rows[$r][$c+1]$rows[$r][$c+2]$rows[$r][$c+3],$rows[$r][$c]$rows[$r+1][$c]$rows[$r+2][$c]$rows[$r+3][$c],$rows[$r][$c]$rows[$r+1][$c+1]$rows[$r+2][$c+2]$rows[$r+3][$c+3],$rows[$r][$c]$rows[$r+1][$c-1]$rows[$r+2][$c-2]$rows[$r+3][$c-3],$rows[$r][$c]$rows[$r-1][$c]$rows[$r-2][$c]$rows[$r-3][$c],$rows[$r][$c]$rows[$r-1][$c+1]$rows[$r-2][$c+2]$rows[$r-3][$c+3],$rows[$r][$c]$rows[$r-1][$c-1]$rows[$r-2][$c-2]$rows[$r-3][$c-3]";
            my @matches = $str =~ m/XMAS/g;
            $sum += @matches;
        }
    }
}

print "$sum\n";