#!/usr/bin/perl
open(FH, '<', 'input.txt') or die $!;

my $count = 0;

while (<FH>){
    chomp;
    my @report = split / /, $_;
    
    my $increasing = $report[0] < $report[1];
    my $len = @report;
    my $safe = 1;
    for (my $i = 1; $i<$len; $i++){
        if (($increasing && $report[$i-1] >= $report[$i])){
            $safe = 0;
        }elsif($increasing && $report[$i]-$report[$i-1]>3) {
            $safe = 0;
        }elsif ((!$increasing && $report[$i] >= $report[$i-1])){
            $safe = 0;
        }elsif(!$increasing && $report[$i-1]-$report[$i]>3){
            $safe = 0;
        }
    }
    
    if ($safe){
        $count++;
    }
}

close FH;

print "COUNT: $count\n";
