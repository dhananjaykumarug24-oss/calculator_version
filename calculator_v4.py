from tkinter import *
import math

expression = ""
memory = 0

# ================= FUNCTIONS ================= #

def press(key):
    global expression
    expression += str(key)
    equation.set(expression)

def clear():
    global expression
    expression = ""
    equation.set("")

def equal():
    global expression
    try:
        expr = expression

        # Replace symbols
        expr = expr.replace("π", str(math.pi))
        expr = expr.replace("e", str(math.e))
        expr = expr.replace("√", "math.sqrt")
        expr = expr.replace("sin", "math.sin")
        expr = expr.replace("cos", "math.cos")
        expr = expr.replace("tan", "math.tan")
        expr = expr.replace("asin", "math.asin")
        expr = expr.replace("acos", "math.acos")
        expr = expr.replace("atan", "math.atan")
        expr = expr.replace("log", "math.log10")
        expr = expr.replace("ln", "math.log")
        expr = expr.replace("abs", "math.fabs")

        result = eval(expr)
        equation.set(result)
        expression = str(result)

    except:
        equation.set("Error")
        expression = ""

def factorial():
    global expression
    try:
        result = math.factorial(int(float(expression)))
        equation.set(result)
        expression = str(result)
    except:
        equation.set("Error")

def percent():
    global expression
    try:
        result = float(expression) / 100
        equation.set(result)
        expression = str(result)
    except:
        equation.set("Error")

# Memory functions
def memory_add():
    global memory
    try:
        memory += float(expression)
    except:
        pass

def memory_sub():
    global memory
    try:
        memory -= float(expression)
    except:
        pass

def memory_recall():
    global expression
    expression = str(memory)
    equation.set(expression)

def memory_clear():
    global memory
    memory = 0

# ================= GUI ================= #

root = Tk()
root.title("Scientific Calculator v4.0 Advanced")
root.geometry("420x600")

equation = StringVar()

entry = Entry(root, textvariable=equation, font=("Arial", 20), bd=10, relief=RIDGE, justify='right')
entry.grid(row=0, columnspan=6, ipadx=8, ipady=15, padx=10, pady=10)

# Make grid responsive
for i in range(6):
    root.grid_columnconfigure(i, weight=1)

# Common button creator
def create_button(text, cmd, r, c):
    Button(root, text=text, width=5, height=2,
           font=("Arial", 12),
           command=cmd).grid(row=r, column=c, padx=5, pady=5)

# ================= BUTTONS ================= #

# Row 1
create_button('7', lambda: press('7'), 1, 0)
create_button('8', lambda: press('8'), 1, 1)
create_button('9', lambda: press('9'), 1, 2)
create_button('/', lambda: press('/'), 1, 3)
create_button('C', clear, 1, 4)
create_button('%', percent, 1, 5)

# Row 2
create_button('4', lambda: press('4'), 2, 0)
create_button('5', lambda: press('5'), 2, 1)
create_button('6', lambda: press('6'), 2, 2)
create_button('*', lambda: press('*'), 2, 3)
create_button('(', lambda: press('('), 2, 4)
create_button(')', lambda: press(')'), 2, 5)

# Row 3
create_button('1', lambda: press('1'), 3, 0)
create_button('2', lambda: press('2'), 3, 1)
create_button('3', lambda: press('3'), 3, 2)
create_button('-', lambda: press('-'), 3, 3)
create_button('x²', lambda: press('**2'), 3, 4)
create_button('x³', lambda: press('**3'), 3, 5)

# Row 4
create_button('0', lambda: press('0'), 4, 0)
create_button('.', lambda: press('.'), 4, 1)
create_button('=', equal, 4, 2)
create_button('+', lambda: press('+'), 4, 3)
create_button('xʸ', lambda: press('**'), 4, 4)
create_button('!', factorial, 4, 5)

# Row 5 (Scientific)
create_button('sin', lambda: press('sin('), 5, 0)
create_button('cos', lambda: press('cos('), 5, 1)
create_button('tan', lambda: press('tan('), 5, 2)
create_button('asin', lambda: press('asin('), 5, 3)
create_button('acos', lambda: press('acos('), 5, 4)
create_button('atan', lambda: press('atan('), 5, 5)

# Row 6
create_button('log', lambda: press('log('), 6, 0)
create_button('ln', lambda: press('ln('), 6, 1)
create_button('√', lambda: press('√('), 6, 2)
create_button('π', lambda: press('π'), 6, 3)
create_button('e', lambda: press('e'), 6, 4)
create_button('abs', lambda: press('abs('), 6, 5)

# Row 7 (Memory)
create_button('M+', memory_add, 7, 0)
create_button('M-', memory_sub, 7, 1)
create_button('MR', memory_recall, 7, 2)
create_button('MC', memory_clear, 7, 3)

root.mainloop()