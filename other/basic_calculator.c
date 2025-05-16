#include <stdio.h>
#include <stdint.h>

int main(void) {
    double num1, num2, result;
    char operation;

    printf("\nEnter the first number: ");
    scanf("%lf", &num1);

    printf("Enter the second number: ");
    scanf("%lf", &num2);
    
    printf("\nWhat operation woudl you like to perform?\n");
    
    printf("+ for Addition\n"
            "- for Subtraction\n"
            "* for Multiplication\n"
            "/ for Division\n");

    scanf(" %c", &operation);

    if (operation == '+') {
        result = num1 + num2;
    } else if (operation == '-') {
        result = num1 - num2;
    } else if (operation == '*') {
        result = num1 * num2;
    } else if (operation == '/') {
        result = num1 / num2;
    }

    printf("\nThe result is %.2lf\n", result);

    return 0;
}