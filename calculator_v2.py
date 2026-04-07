from tkinter import *

def press(num):
    global expression
    expression = expression + str(num)
    equation.set(expression)

def equal():
    global expression
    try:
        result = str(eval(expression))
        equation.set(result)
        expression = result
    except:
        equation.set("Error")
        expression = ""

def clear():
    global expression
    expression = ""
    equation.set("")

root = Tk()
root.title("Calculator v2.0")

expression = ""
equation = StringVar()

entry = Entry(root, textvariable=equation)
entry.grid(columnspan=4, ipadx=50)

buttons = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','=','+'
]

row = 1
col = 0

for b in buttons:
    if b == "=":
        Button(root, text=b, command=equal, height=2, width=5).grid(row=row, column=col)
    else:
        Button(root, text=b, command=lambda x=b: press(x), height=2, width=5).grid(row=row, column=col)

    col += 1
    if col > 3:
        col = 0
        row += 1

Button(root, text="C", command=clear, height=2, width=20).grid(row=row, columnspan=4)

root.mainloop()