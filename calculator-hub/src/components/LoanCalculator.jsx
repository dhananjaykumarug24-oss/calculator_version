import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Landmark } from "lucide-react";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    const P = principal;
    const r = rate / (12 * 100); // monthly interest rate
    const n = years * 12; // number of months

    if (P > 0 && r > 0 && n > 0) {
      const emiCalc = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emiCalc * n;
      const interest = totalAmount - P;

      setEmi(Math.round(emiCalc));
      setTotalPayable(Math.round(totalAmount));
      setTotalInterest(Math.round(interest));
    }
  }, [principal, rate, years]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl overflow-hidden border-none bg-background">
      <div className="grid md:grid-cols-2">
        <div className="p-8 bg-muted/50 border-r border-border">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="size-6 text-primary" />
              <CardTitle className="text-2xl font-bold">Loan EMI Calculator</CardTitle>
            </div>
            <CardDescription>Plan your finances with precision</CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="principal" className="text-sm font-semibold">Principal Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate" className="text-sm font-semibold">Interest Rate (% p.a.)</Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years" className="text-sm font-semibold">Tenure (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </div>

        <div className="p-8 flex flex-col justify-center bg-primary/5">
          <div className="space-y-8">
            <div className="text-center p-6 bg-background rounded-2xl shadow-sm border border-border">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Monthly EMI</p>
              <h3 className="text-5xl font-black text-primary tracking-tighter">
                {formatCurrency(emi)}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">Total Interest</p>
                <p className="text-lg font-bold">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">Total Amount</p>
                <p className="text-lg font-bold">{formatCurrency(totalPayable)}</p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-xl flex items-start gap-3">
              <Calculator className="size-5 text-primary mt-0.5" />
              <p className="text-xs text-primary/80 leading-relaxed font-medium">
                The calculated EMI is an estimate. Actual values may vary based on bank processing fees and specific terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
