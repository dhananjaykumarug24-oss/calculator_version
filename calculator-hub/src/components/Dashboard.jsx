import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Landmark, Microscope, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const calculators = [
  {
    id: 'basic',
    title: 'Basic Calculator',
    description: 'Quick arithmetic for everyday tasks.',
    icon: Calculator,
    color: 'bg-blue-500/10 text-blue-500',
    border: 'border-blue-500/20'
  },
  {
    id: 'scientific',
    title: 'Scientific Calculator',
    description: 'Advanced math, trig, and logs.',
    icon: Microscope,
    color: 'bg-indigo-500/10 text-indigo-500',
    border: 'border-indigo-500/20'
  }
];

export default function Dashboard({ onSelect }) {
  return (
    <div className="space-y-12 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-7xl">
          Calculator <span className="text-primary italic">Hub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          A premium suite of precision tools for students, engineers, and financial planners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
        {calculators.map((calc, index) => (
          <motion.div
            key={calc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="cursor-pointer group"
            onClick={() => onSelect(calc.id)}
          >
            <Card className={`h-full border-2 transition-all hover:shadow-2xl hover:shadow-primary/10 ${calc.border}`}>
              <CardHeader>
                <div className={`size-14 rounded-2xl ${calc.color} flex items-center justify-center mb-4 transition-transform group-hover:rotate-12`}>
                  <calc.icon size={28} />
                </div>
                <CardTitle className="text-2xl font-bold">{calc.title}</CardTitle>
                <CardDescription className="text-base">{calc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary font-bold text-sm gap-1 group-hover:gap-3 transition-all">
                  Launch {calc.title.split(' ')[0]} <ArrowRight size={16} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-xs font-bold text-muted-foreground uppercase tracking-widest">
           v1.0.0 Production Build
        </div>
      </div>
    </div>
  );
}
