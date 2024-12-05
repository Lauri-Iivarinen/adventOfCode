#!/usr/bin/perl
open(FH, '<', 'input.txt') or die $!;

#read input, save keypairs for easy check, check books for input, right in hashmap and left not in hashmap

my %page_map = ();
my @books = ();
my $sum = 0;

while (<FH>) {
    chomp;
    if ($_ =~ m/[0-9]+\|[0-9]+/){
        my ($key, $val) = $_ =~ m/^[0-9]+|[0-9]+$/g;
        push @{$page_map{$key}} , $val;
    }
    if ($_ =~ m/[0-9]+,/) {
        push @books, $_;
    }
}

foreach my $b (@books) {
    my @book = split "," , $b;
    my $i = 0;
    my $ok = 1;
    foreach my $page (@book) {
        @before_p = @{$page_map{$page}};
        my %p = map { $_ => 1 } @before_p;
        if (($i && exists($p{$book[$i-1]})) || (!exists($p{$book[$i+1]}) && $i != @book-1)) {
            $ok = 0;
        }
        $i++
    }

    if ($ok) {
        $sum += $book[@book/2-0.5];
    }
}
print "$sum\n";