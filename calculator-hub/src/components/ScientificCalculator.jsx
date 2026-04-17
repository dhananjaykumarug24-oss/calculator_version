import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');

  const append = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const calculate = () => {
    try {
      let expression = display;
      // Map display symbols to JS Math methods
      expression = expression.replace(/sin\(/g, 'Math.sin(');
      expression = expression.replace(/cos\(/g, 'Math.cos(');
      expression = expression.replace(/tan\(/g, 'Math.tan(');
      expression = expression.replace(/log\(/g, 'Math.log10(');
      expression = expression.replace(/ln\(/g, 'Math.log(');
      expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
      expression = expression.replace(/π/g, 'Math.PI');
      expression = expression.replace(/e/g, 'Math.E');
      expression = expression.replace(/\^/g, '**');

      const result = eval(expression);
      setHistory(display + ' =');
      setDisplay(String(Number(result).toFixed(6)).replace(/\.?0+$/, ''));
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setHistory('');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-t-4 border-t-indigo-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">Scientific Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 text-right font-mono ring-4 ring-slate-800">
          <div className="text-slate-400 text-sm mb-1 h-5">{history}</div>
          <div className="text-4xl font-bold tracking-tight overflow-hidden truncate">{display}</div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {/* Scientific Functions */}
          <Button variant="secondary" onClick={() => append('sin(')}>sin</Button>
          <Button variant="secondary" onClick={() => append('cos(')}>cos</Button>
          <Button variant="secondary" onClick={() => append('tan(')}>tan</Button>
          <Button variant="secondary" onClick={() => append('π')}>π</Button>
          <Button variant="outline" className="text-destructive font-bold" onClick={clear}>AC</Button>

          <Button variant="secondary" onClick={() => append('log(')}>log</Button>
          <Button variant="secondary" onClick={() => append('ln(')}>ln</Button>
          <Button variant="secondary" onClick={() => append('sqrt(')}>√</Button>
          <Button variant="secondary" onClick={() => append('e')}>e</Button>
          <Button variant="secondary" onClick={() => append('^')}>^</Button>

          {/* Numbers & Basic Ops */}
          {[7, 8, 9].map(n => <Button key={n} variant="ghost" className="text-lg" onClick={() => append(String(n))}>{n}</Button>)}
          <Button variant="outline" onClick={() => append('(')}>(</Button>
          <Button variant="outline" onClick={() => append(')')}>)</Button>

          {[4, 5, 6].map(n => <Button key={n} variant="ghost" className="text-lg" onClick={() => append(String(n))}>{n}</Button>)}
          <Button variant="outline" onClick={() => append('/')}>/</Button>
          <Button variant="outline" onClick={() => append('*')}>*</Button>

          {[1, 2, 3].map(n => <Button key={n} variant="ghost" className="text-lg" onClick={() => append(String(n))}>{n}</Button>)}
          <Button variant="outline" onClick={() => append('-')}>-</Button>
          <Button variant="outline" onClick={() => append('+')}>+</Button>

          <Button variant="ghost" className="text-lg col-span-2" onClick={() => append('0')}>0</Button>
          <Button variant="ghost" className="text-lg" onClick={() => append('.')}>.</Button>
          <Button className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold" onClick={calculate}>=</Button>
        </div>
      </CardContent>
    </Card>
  );
}
