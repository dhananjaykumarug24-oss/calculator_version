import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Delete, Divide, Minus, Plus, X } from "lucide-react";

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      // Using a safer evaluation method than raw eval for basic arithmetic
      const result = Function('"use strict";return (' + fullEquation.replace(/x/g, '*') + ')')();
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-xl border-t-4 border-t-primary">
      <CardHeader className="bg-muted/30 pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          Basic Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-muted rounded-lg p-4 mb-6 text-right transition-all">
          <div className="text-sm text-muted-foreground h-6 overflow-hidden">
            {equation}
          </div>
          <div className="text-4xl font-mono font-bold tracking-tighter truncate">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" size="lg" className="h-14 text-xl font-bold text-destructive hover:bg-destructive/10" onClick={clear}>AC</Button>
          <Button variant="outline" size="lg" className="h-14" onClick={() => handleNumber('(')}>(</Button>
          <Button variant="outline" size="lg" className="h-14" onClick={() => handleNumber(')')}>)</Button>
          <Button variant="secondary" size="lg" className="h-14" onClick={() => handleOperator('/')}>
            <Divide className="size-5" />
          </Button>

          {[7, 8, 9].map((num) => (
            <Button key={num} variant="ghost" size="lg" className="h-14 text-xl font-medium" onClick={() => handleNumber(String(num))}>{num}</Button>
          ))}
          <Button variant="secondary" size="lg" className="h-14" onClick={() => handleOperator('*')}>
            <X className="size-5" />
          </Button>

          {[4, 5, 6].map((num) => (
            <Button key={num} variant="ghost" size="lg" className="h-14 text-xl font-medium" onClick={() => handleNumber(String(num))}>{num}</Button>
          ))}
          <Button variant="secondary" size="lg" className="h-14" onClick={() => handleOperator('-')}>
            <Minus className="size-5" />
          </Button>

          {[1, 2, 3].map((num) => (
            <Button key={num} variant="ghost" size="lg" className="h-14 text-xl font-medium" onClick={() => handleNumber(String(num))}>{num}</Button>
          ))}
          <Button variant="secondary" size="lg" className="h-14" onClick={() => handleOperator('+')}>
            <Plus className="size-5" />
          </Button>

          <Button variant="ghost" size="lg" className="h-14 text-xl font-medium col-span-2" onClick={() => handleNumber('0')}>0</Button>
          <Button variant="ghost" size="lg" className="h-14 text-xl font-medium" onClick={() => handleNumber('.')}>.</Button>
          <Button variant="primary" size="lg" className="h-14 font-bold bg-primary text-primary-foreground hover:bg-primary/90" onClick={calculate}>=</Button>
        </div>
      </CardContent>
    </Card>
  );
}
