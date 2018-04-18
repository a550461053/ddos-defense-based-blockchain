#!/bin/bash
echo 'hello'

:<<BLOCK
echo 'test'
BLOCK

:<<BLOCK
echo 'Wrong'
ls='ls -l'
BLOCK
echo 'finish'

N=10
for ((i=1; i<10; i++))
do
a=$((i))
echo $a;
done

a="aa"
res=${a}"bb"
echo $res

res="CO_${N}"
echo $res

index=1
while [ "$index" -lt "10" ]
do
echo $index
((index++))
done

s='010'
var="00${s}${N}"
echo $var
echo '010'"1"

a=4
b=a
c=$((a))
echo $b
echo $c
echo $((a%c))

array=($a $b $c)
echo ${array[1]}
len=${#array[*]}
echo $len

#RANDOM=10
echo $RANDOM
echo $RANDOM



