#!/usr/bin/perl
open(FH, '<', 'input.txt') or die $!;

my @guard_pos = (0,0);
my $r = 0;
my $c = 0;
my %map = ();
while (<FH>){
    chomp;
    my @row = split "", $_;
    $c = 0;
    foreach my $col (@row){
        if ($col eq "^") {
            @guard_pos = ($c, $r);
        }
        $c++;
    }
    $map{$r} = \@row;
    $r++;
}

my %positions = ("^" => '0,-1', "v" => '0,1', "<" => '-1,0', ">" => '1,0');
my %guard_map = ("^" => '>', "v" => '<', "<" => '^', ">" => 'v');
%guard_path = ();
my $guard_dir = '^';

while ($guard_pos[0] >= 0 && $guard_pos[1] >= 0 && $guard_pos[0] < $r && $guard_pos[1] < $c){
    $guard_path{"$guard_pos[0],$guard_pos[1]"} = 1;
    my ($x, $y) = split "," , $positions{$guard_dir};
    if ($guard_pos[1]+$y < 0 || $guard_pos[0]+$x < 0){
        last;
    }
    my @next_row = @{$map{$guard_pos[1]+$y}};
    my $next_tile = $next_row[$guard_pos[0]+$x];

    if ($next_tile eq "#") {
        $guard_dir = $guard_map{$guard_dir};
    }else {
        my ($x, $y) = split "," , $positions{$guard_dir};
        @guard_pos = ($guard_pos[0]+$x, $guard_pos[1]+$y);
    }
}

my $res = keys %guard_path;
my @path = keys %guard_path;
print "$res\n";