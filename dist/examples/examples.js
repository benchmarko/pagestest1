/* globals cpcBasic */

"use strict";

cpcBasic.addItem("", `
REM cpcmhz - CPC MHz: Time measurement
PRINT "Measurement started."
DIM r(5)
ms=100/10:mxcpc=90/10
'
FOR i=0 TO 4
c=0:t1=INT(TIME*300/1000)
t=t1: WHILE t=t1:t=INT(TIME*300/1000):c=c+1:WEND
c=0:t1=t+ms
WHILE t<t1:t=INT(TIME*300/1000):c=c+1:WEND
r(i)=c
NEXT
PRINT "In";ms;"ms we can count to:";
mx=0
FOR i=0 TO 4
PRINT STR$(r(i));
mx=MAX(mx,r(i))
NEXT
mhz=mx/mxcpc*4
PRINT "":PRINT "=> max:";STR$(mx);", CPC";mhz;"MHz"
`);

cpcBasic.addItem("", `
REM euler - Compute e with 1000 digits
CLS
PRINT"Compute e with 1000 digits"
DIM a(202)
b=100000:a(0)=1
FOR n=450 TO 1 STEP -1
  if a(0)>0 then FOR i=0 TO 201: q=INT(a(i)/n):r=a(i)-q*n: a(i)=q:a(i+1)=a(i+1)+b*r: NEXT
  a(0)=a(0)+1
NEXT
'Round 
a(201)=a(201)+INT(a(202)/b+0.5)
FOR i=200 TO 1 STEP -1
  u=INT(a(i)/b):a(i)=a(i)-b*u
  a(i-1)=a(i-1)+u
NEXT
'rem
PRINT"e=";a(0);"."
FOR i=1 TO 200
  a$=STR$(a(i)):a$=RIGHT$(a$,LEN(a$)-1)
  PRINT RIGHT$("0000"+a$,5);" ";
NEXT
`);

cpcBasic.addItem("", `
REM lifegame - Game of Life
ze=10:sp=10:DIM al(ze,sp+1):DIM ne(ze,sp+1)
PRINT"L I F E G A M E"
FOR w=1 TO 18
  x=INT(7*RND(1)+1):y=INT(7*RND(1)+1):IF al(x,y)<>1 THEN al(x,y)=1
NEXT w
al(5,4)=1:al(5,5)=1:al(5,6)=1
FOR i=1 TO ze-1:FOR j=1 TO sp
  IF al(i,j)=0 THEN PRINT " "; ELSE PRINT "*";
NEXT j: PRINT "": NEXT i
FOR i=1 TO ze-1:FOR j=1 TO sp:an=0:ne(i,j)=0
  an=al(i-1,j-1)+al(i-1,j)+al(i-1,j+1)+al(i,j-1)+al(i,j+1)+al(i+1,j-1)+al(i+1,j)+al(i+1,j+1)
  IF al(i,j)<>0 THEN IF an=2 THEN ne(i,j)=1
  IF an=3 THEN ne(i,j)=1
NEXT j:NEXT i
FOR i=1 TO ze-1:FOR j=1 TO sp:al(i,j)=ne(i,j):NEXT j:NEXT i
`);

cpcBasic.addItem("", `
100 REM ninedig - Das Raetsel
110 '21.5.1988 Kopf um Kopf
120 'ab*c=de  de+fg=hi   [dabei sind a-i verschiedene Ziffern 1-9!!]
130 'MODE 1
135 PRINT"Please wait ...  ( ca. 1 min 34 sec )"
140 'CLEAR:DEFINT a-y
150 '
155 z=TIME
160 FOR a=1 TO 9:FOR b=1 TO 9:FOR c=1 TO 9:FOR f=1 TO 9:FOR g=1 TO 9
165 cnd = -1
170 de=(a*10+b)*c
175 cnd = cnd AND NOT(de>99)
180 hi=de+(f*10+g)
185 cnd = cnd AND NOT(hi>99)
190 d=INT(de/10):e=de MOD 10:h=INT(hi/10):i=hi MOD 10
200 cnd = cnd AND NOT(a=b OR a=c OR a=d OR a=e OR a=f OR a=g OR a=h OR a=i)
210 cnd = cnd AND NOT(b=c OR b=d OR b=e OR b=f OR b=g OR b=h OR b=i)
220 cnd = cnd AND NOT(c=d OR c=e OR c=f OR c=g OR c=h OR c=i)
230 cnd = cnd AND NOT(d=e OR d=f OR d=g OR d=h OR d=i)
240 cnd = cnd AND NOT(e=f OR e=g OR e=h OR e=i)
250 cnd = cnd AND NOT(f=g OR f=h OR f=i)
260 cnd = cnd AND NOT(g=h OR g=i)
270 cnd = cnd AND NOT(h=i)
280 cnd = cnd AND NOT(i=0)
285 if cnd<> 0 then GOSUB 350: STOP
320 NEXT g,f,c,b,a
330 ?"No solution found!"
340 stop
345 '
350 z=TIME-z
360 PRINT"The solution:":PRINT
370 PRINT a*10+b;"*";c;"=";de;" / ";de;"+";f*10+g;"=";hi
380 PRINT z,z/300
390 RETURN
400 '
`);

cpcBasic.addItem("", `
REM sieve - Sieve
n=1000000
DIM sieve1(n + 1)
nHalf = INT(n / 2)
REM initialize sieve
FOR i = 0 TO nHalf: sieve1(i) = 0: NEXT i
REM compute primes
i = 0
m = 3
x = 1
WHILE m * m <= n
  IF sieve1(i) = 0 THEN x = x + 1
  j = INT((m * m - 3) / 2)
  WHILE j < nHalf
    sieve1(j) = 1
    j = j + m
  WEND
  i = i + 1
  m = m + 2
WEND
REM count remaining primes
WHILE m <= n
  IF sieve1(i) = 0 THEN x = x + 1
  i = i + 1
  m = m + 2
WEND
PRINT "Number of primes below ";n;": ";x
`);

cpcBasic.addItem("", `
REM testsub - Test Subroutines
?"start"
'
100 ?"sub100"
return
'
200 ?"sub200"
  ?"inside sub200"
  gosub 100
return
'
gosub 200
?"in between"
'
300 ?"sub300"
  ?"inside sub300"
  'gosub 400
return
'
gosub 300
a=1
on a gosub 200, 300
?"at end"
`);

cpcBasic.addItem("", `
REM testpage - Test Page
cls
?"testpage"
' numbers
a=1
a=1.2
a=-1.2
a=+7.2
a=&0
a=&A7
a=-&A7
a=&7FFF
a=&8000
a=&FFff
a=&E123
a=&X0
a=&X10100111
a=-&x111111111111111
a=255
a=-255
a=256
a=-256
a=32767
a=-32767
a=32768
a=-32768
a=65536
''a=1.2e+9
''a=&x2
' strings
a$="a12"
''a$="\\"
2 newline=7
' variables
''a!=1.4
''a%=1.4
a$="1.4"
case=1
CASE=1
CaSe=cAsE
''insert.line=2
''in.ser.t.lin.e=2
''a!(2)=1.4
''a%(2)=1.4
dim a$(2): a$(2)="1.4"
''a$[2]="1.4"
dim a(9), b(1,2): a(9)=b(1,2)
''a[9]=b[1,2]
dim a(10,10,10), b(10,9): a(10,10,10)=b(10,9)
dim a(1), b(2,2,1): a(round(1.4))=b(round(1.5),round(2.4),1)
x=1:a(x+1)=b(x,x*2,round(x+1.5))
a(x+1)=b(int(x),x*2,x-1+&d)
''1 a$=a%
''1 a$=a!
''1 abc=def
' expressions
a=1+2+3
a=3-2-1
a=&A7+&X10100111-(123-27)
a=(3+2)*(3-7)
a=-(10-7)-(-6-2)
a=20/2.5
a=20\\3
a=3^2
a=&X1001 AND &X1110
a=&X1001 OR &X110
a=&X1001 XOR &X1010
a=NOT &X1001
''a=+++++++++---9
a=(1=0)
a=(1>0)*(0<1)
a=(b>=c)*(d<=e)
a=1=1=-1
a=1>=1>1
' Line numbers
0 c=1
65535 c=1
65536 c=1
2 c=1
1 c=1
' special
' abs, after gosub, and, asc, atn, auto
a=abs(2.3)
''10 after 2 gosub 10
''10 after 3,1 gosub 10
''1 after gosub 1
''1 after 1,2,3 gosub 1
a=b and c
a=asc("A")
a=asc(b$) and c
a=atn(2.3)
''auto
''auto 100
' bin$, border
a$=bin$(3)
a$=bin$(3,8)
a$=bin$(&x1001)
''border 5
''border 5,a
' call, cat, chain, chain merge, chr$, cint, clg, closein, closeout, cls, cont, copychr$, cos, creal, cursor
''call&a7bc
''call 4711,1,2,3,4
''cat
''chain"f1"
''chain"f2" , 10
''chain"f3" , 10+3
''chain "f4" , 10+3, delete 100-200
''chain "f5" , , delete 100-200
''chain merge "f1"
''chain merge "f2" , 10
''chain merge "f3" , 10+3
''chain merge "f4" , 10+3, delete 100-200
''chain merge "f5" , , delete 100-200
a$=chr$(65)
a=cint(2.3)
''clear
''clear input
''clg
''clg 15-1
''closein
''closeout
''cls 'tested on top
''cls #5
''cls #a+7-2*b
''cont
''a$=copychr$(#0)
''a$=copychr$(#a+1)
a=cos(2.3)
''a=creal(2.3+a)
''cursor
''cursor 0
''cursor 1
''cursor 1,1
''cursor ,1
''cursor #2
''cursor #2,1
''cursor #2,1,1
''cursor #2,,1
' data, dec$, def fn, defint, defreal, defstr, deg, delete, derr, di, dim, draw, drawr
''data
''data ,
''data \
data 1,2,3
data "item1"," item2","item3 "
''data item1,item2,item3
data &a3,4 '',abc,
data " " '',!"#$%&'()*+,","
''data "string in data with ... newline"
''a$=dec$(3,"##.##")
''def fnclk=10
''def fnclk(a)=a*10
''def fnclk(a,b)=a*10+b
''def fnclk$(a$,b$)=a$+b$
''def fn clk=10
''def fn clk(a)=a*10
''def fn clk(a,b)=a*10+b
''def fn clk$(a$,b$)=a$+b$
''def fncls=1
''def fncls1(x+1)=1
''def fx=1
''def fx y=1
''defint a
''defint a-t
''defint a-T
''defint a,b,c
''defint a,b-c,v,x-y
''defint a:b=a+c
''defint a:a=a+1
''defint a:a!=a!+a%:a$="7"
''defint a:ab=ab+de[7]
''1 defint z-a
''defreal a
''defreal a-t
''defreal a-T
''defreal a,b,c
''defreal a,b-c,v,x-y
''defreal a:b=a+c
''defreal a:a=a+1
''defreal a:a!=a!+a%:a$="7"
''defreal a:ab=ab+de[7]
''1 defreal z-a
''defstr a
''defstr a-t
''defstr a-T
''defstr a,b,c
''defstr a,b-c,v,x-y
''defstr a:b=a+c
''defstr a:a=a+1
''defstr a:a!=a!+a%:a$="7"
''defstr a:ab=ab+de[7]
''1 defstr z-a
''defstr f:f(x)="w"
''deg
''delete
''delete -
''delete ,
''delete -,
''delete 10
''delete 1-
''delete -1
''delete 1-2
''1 delete 2-1
''1 delete 1+2
''1 delete a
''a=derr
''di
dim a(1)
''dim a!(1)
''dim a%(1)
dim a$(1)
dim a(2,13)
x=1: dim a(2,13+7),b$(3),c(2*x,7)
''dim a[2,13)
''draw 10,20
''draw -10,-20,7
''draw 10,20,7,3
''draw 10,20,,3
''draw x,y,m,g1
''drawr 10,20
''drawr -10,-20,7
''drawr 10,20,7,3
''drawr 10,20,,3
''drawr x,y,m,g1
' edit, ei, else, end, ent, env, eof, erase, erl, err, error, every gosub, exp
''edit 20
''ei
''else
''else 10
''else a=7
' see below: end
''ent 1
''ent 1,2,a,4
''ent num,steps,dist,ti,steps2,dist2,ti2
''ent num,=period,ti,=period2,ti2
''env 1
''env 1,2,a,4
''env num,steps,dist,ti,steps2,dist2,ti2
''env num,=reg,period,=reg2,period2
''a=eof
''erase a
''erase b$
''erase a,b$,c!,d%
''1 erase 5
''a=erl
''a=err
''error 7
''error 5+a
''10 every 50 gosub 10
''10 every 25.2,1 gosub 10
''10 every 10+a,b gosub 10
a=exp(2.3)
' fill, fix, fn, for, frame, fre
''fill 7
a=fix(2.3)
'' x=fnclk 'TODO?
'' x=fnclk(a) 'TODO?
'' x=fnclk(a,b) 'TODO?
'' x$=fnclk$(a$,b$) 'TODO?
''x=fn clk
''x=fn clk(a)
''x=fn clk(a,b)
''x$=fn clk$(a$,b$)
for a=1 to 10: next
''for a%=1.5 to 9.5: next
''for a!=1.5 to 9.5: next
for a=1 to 10 step 3: next
b=1: for a=5+b to -4 step -2.3: next
b=1:c=5:d=2: for a=b to c step d: next
b=1:c=3: for a=b to c: next
for a=1 to 1 step 0+1: next
b=1:c=3:s=1: for a=b to c step s: next
for a=1 to 2 step 0+1: next
for a=-1 to -2 step 0-1: next
for a=&a000 TO &a00b step &x101: next
for a=2 to 1 step -&1: next
for a=2 to 1 step -&x1: next
''1 for a$=1 to 2: next
for abc=1 to 10 step 3:next abc
''for a=b to c step s:a=0:next
''frame
''a=fre(0)
''a=fre("")
''a=fre(b-2)
''a=fre(a$)
' gosub, goto, graphics paper, graphics pen
5 gosub 10
''1 gosub a
''10 goto 10
''1 goto a
''graphics paper 5
''graphics paper 2.3*a
''graphics pen 5
''graphics pen 5,1
''graphics pen ,0
''graphics pen 2.3*a,1+b
' hex$, himem
a$=hex$(16)
a$=hex$(16,4)
a$=hex$(a,b)
''a=himem
' if, ink, inkey, inkey$, inp, input, instr, int
if a=1 then a=2
if a=1 then a=2 else a=1
''if a=1 then
''if a=1 then else
''if a=1 then a=2 else
''if a=1 then else a=1
''if a=1 then if b=1 then else else a=1
''10 if a=1 then goto 10
''10 if a=1 then 10
''10 if a=1 goto 10
''10 if a=1 then a=a+1:goto 10
10 if a=1 then gosub 10
''10 if a=1 then 10:a=never1
''10 if a=1 then 10 else 20 '20 rem
''10 if a=1 then 10 else goto 20 '20 rem
''10 if a=b+5*c then a=a+1: goto 10 else a=a-1:goto 20
10 if a=b+5*c then a=a+1: gosub 10 else a=a-1:gosub 20
20 rem
10 if a<>3 then gosub 10
10 if a$<>"3" then gosub 10
''ink 2,19
''ink 2,19,22
''ink a*2,b-1,c
''a=inkey(0)
''a$=inkey$
''a=inp(&ff77)
''input a$
''input a$,b
''input ;a$,b
''input "para",a$,b
''input "para";a$,b
''input ;"para noCRLF";a$,b
''input#2,;"para noCRLF";a$,b
''input#stream,;"string";a$,b
''a=instr("key","ey")
''a=instr(s$,find$)
''a=instr(start,s$,find$)
a=int(-2.3)
a=int(b+2.3)
' joy
''a=joy(0)
''a=joy(b+1)
' key, key def
''key 11,"border 13:paper 0"
''key a,b$
''key def 68,1
''key def 68,1,159
''key def 68,1,159,160
''key def 68,1,159,160,161
''key def num,fire,normal,shift,ctrl
' left$, len, let, line input, list, load, locate, log, log10, lower$
a$=left$(b$,n)
a=len(a$)
''let a=a+1
''line input a$
''line input ;a$
''line input "para",a$
''line input "para";a$
''line input ;"para noCRLF";a$
''line input#2,;"para noCRLF";a$
''line input#stream,;"string";a$
''list
''list -
''list ,
''list -,
''list 10
''list 1-
''list -1
''list 1-2
''list #3
''list ,#3
''list 10,#3
''list 1-,#3
''list -1,#3
''list 1-2,#3
''list a
''load "file"
''load "file.scr",&c000
''load f$,adr
''locate 10,20
''locate#2,10,20
''locate#stream,x,y
a=log(10)
a=log10(10)
b$="AbC": a$=lower$(b$)
a$=lower$("String")
' mask, max, memory, merge, mid$, min, mod, mode, move, mover
''mask &x10101011
''mask 2^(8-x),1
''mask a,b
''mask ,b
a=max(1)
a=max(1,5)
a=max(b,c,d)
''a$=max("abc")
''1 a$=max("abc","d")
''memory &3fff
''memory adr
''merge "file"
''merge f$
a$=mid$("string",3)
a$=mid$("string",3,2)
a$=mid$(b$,p)
a$=mid$(b$,p,lg)
''mid$(a$,2)=b$
''mid$(a$,2,2)=b$
''mid$(a$,b%,c!)="string"
a=min(1)
a=min(1,5)
a=min(b,c,d)
''a$=min("abc")
''1 a$=min("abc","d")
a=10 mod 3
a=b mod -c
''mode 0
''mode n+1
''move 10,20
''move -10,-20,7
''move 10,20,7,3
''move 10,20,,3
''move x,y,m,g1
''mover 10,20
''mover -10,-20,7
''mover 10,20,7,3
''mover 10,20,,3
''mover x,y,m,g1
' new, next, not
''new
for a=1 to 2: next
for i=1 to 2: next i
for j=1 to 2:for i=3 to 4: next i,j
a=not 2
a=not -b
' on break ..., on error goto, on gosub, on goto, on sq gosub, openin, openout, or, origin, out
''on break cont
''10 on break gosub 10
''on break stop
''10 on error goto 0
''10 on error goto 10
''1 on error goto 0:a=asc(0)
''1 on error goto 2:a=asc(0) '2 rem
''1 on error goto 0:?chr$("A")
''1 on error goto 2:?chr$("A") '2 rem
''1 on error goto 0:a$=dec$(b$,"\\    \\")
''1 on error goto 2:a$=dec$(b$,"\\    \\") '2 rem
''1 on error goto 0:mask ,
''1 on error goto 2:mask , '2 rem
10 on 1 gosub 10
10 on x gosub 10,20 '20 rem
10 on x+1 gosub 10,20,20 '20 rem
''10 on 1 goto 10
''10 on x goto 10,20 '20 rem
''10 on x+1 goto 10,20,20 '20 rem
''10 on sq(1) gosub 10
''10 on sq(channel) gosub 10
''openin "file"
''openin f$
''openout "file"
''openout f$
a=1 or &1a0
a=b or c
''origin 10,20
''origin 10,20,5,200,50,15
''origin x,y,left,right,top,bottom
''ut &bc12,&12
''out adr,by
' paper, peek, pen, pi, plot, plotr, poke, pos, print
''paper 2
''paper#stream,p
''a=peek(&c000)
''a=peek(adr+5)
''pen 2
''pen 2,1
''pen#3,2,1
''pen#stream,p,trans
a=pi
''plot 10,20
''plot -10,-20,7
''plot 10,20,7,3
''plot 10,20,,3
''plot x,y,m,g1
''plotr 10,20
''plotr -10,-20,7
''plotr 10,20,7,3
''plotr 10,20,,3
''plotr x,y,m,g1
''poke &c000,23
''poke adr,by
''a=pos(#0)
''a=pos(#stream)
print
''print ,
print ;
''print #2
''print #2,
print "string"
print 999999999;
''print 1e9;
''print 2.5e10;
print 1.234567846;
print a$
print a$,b
''print#2,a$,b
''print using"####";ri;
''print using "##.##";-1.2
''print using"### ########";a,b
''print using "\\   \\";"n1";"n2";" xx3";
''print using "!";"a1";"a2";
''print using "&";"a1";"a2";
''print#9,tab(t);t$;i;"h1"
?
''?#2,ti-t0!;spc(5);
' rad, randomize, read, release, rem, remain, renum, restore, resume, return, right$, rnd, round, run
''rad
''randomize
''randomize 123.456
read a$
read b
read a$,b,c$
''release 1
''release n+1
rem
rem comment until EOL
rem \
'
'comment until EOL
'\
a=1 'comment
''a=remain(0)
''a=remain(ti)
''renum
''renum 100
''renum 100,50
''renum 100,50,2
restore
10 restore 10
''resume
''10 resume 10
''resume next
return
a$=right$(b$,n)
''a=rnd
a=rnd(0)
a=rnd(-1*b)
a=round(2.335)
a=round(2.335,2)
''run
''10 run 10
''run "file"
''run f$
' save
''save "file"
''save "file",p
''save "file",a
''save "file.scr",b,&c000,&4000
''save "file.bin",b,&8000,&100,&8010
''save f$,b,adr,lg,entry
a=sgn(5)
a=sgn(0)
a=sgn(-5)
a=sin(2.3)
''sound 1,100
''sound 1,100,400
''sound 1,100,400,15
''sound 1,100,400,15,1
''sound 1,100,400,15,1,1
''sound 1,100,400,15,1,1,4
''sound ch,period,duration,,,,noise
''sound ch,period,duration,vol,env1,ent1,noise
a$=space$(9)
a$=space$(9+b)
''speed ink 10,5
''speed ink a,b
''speed key 10,5
''speed key a,b
''speed write 1
''speed write a-1
''1 speed mode 2
''a=sq(1)
''a=sq(channel)
a=sqr(9)
'' below: stop
a$=str$(123)
a$=str$(a+b)
a$=string$(40,"*")
''a$=string$(40,42)
a$=string$(lg,char$)
''symbol 255,1,2,3,4,5,6,7,&x10110011
''symbol 255,1
''symbol after 255
' tag, tagoff, tan, test, testr, time, troff, tron
''tag
''tag#2
''tag#stream
''tagoff
''tagoff#2
''tagoff#stream
a=tan(45)
''a=test(10,20)
''a=test(x,y)
''a=testr(10,-20)
''a=testr(xm,ym)
t=time
''troff
''tron
' unt, upper$
''a=unt(&ff66)
a$=upper$("String")
a$=upper$(b$)
' val, vpos
a=val("-2.3")
a=val(b$)
''a=vpos(#0)
''a=vpos(#stream)
' wait, wend, while, width, window, window swap, write
''wait &ff34,20
''wait &ff34,20,25
while a=10: wend
while a>0: wend
''width 40
''window 10,30,5,20
''window#1,10,30,5,20
''window#stream,left,right,top,bottom
''window swap 1
''window swap 1,0
''1 window swap #1
''write
''write #2
''write #2,
''write "string"
''write 999999999
''write 1e9
''write 2.5e10
''write 1.234567846
''write a$
''write a$,b
''write#2,a$,b
''write#2,a$;b
''write ,
''write ;
' xor, xpos
a=&x1001 xor &x0110
a=b xor c
''a=xpos
' ypos
''a=ypos
' zone
''zone 13+n
' rsx
''|a
''|b
''|basic
''|cpm
''a$="*.drw":|dir,@a$
''|disc
''|disc.in
''|disc.out
''|drive,0
''1 |drive,
''1 |drive,#1
''|era,"file.bas"
''|ren,"file1.bas","file2.bas"
''|tape
''|tape.in
''|tape.out
''|user,1
''|mode,3
''|renum,1,2,3,4
''|
' keepSpaces
' PRG
'
stop
end
10 return
20 return
`);
