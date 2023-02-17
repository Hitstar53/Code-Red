#include <stdio.h>
#include <stdlib.h>

void print(int arr[], int size)
{
    for (int i = 0; i < 5; i++)
    {
        printf("%d ", arr[i]);
    }
}
void insertionsort(int arr[], int size)
{
    int index;
    for (int i = 0; i < size; i++)
    {
        printf("In 1st loop");
        for (int j = i - 1; j >= 0 && j < size; j--)
        {
            if (arr[j + 1] < arr[j])
            {
                index = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = index;
            }
        }
    }
}

int main()
{
    int size;
    printf("Enter the size integers: ");
    scanf(" %d", &size);
    int arr[size];
    printf("Enter the integers: ");
    for (int i = 0; i < size; ++i)
    {
        scanf("%d", &arr[i]);
    }
    printf("Displaying integers: ");
    for (int i = 0; i < size; ++i)
    {
        printf("%d\n", arr[i]);
    }
       printf("In bef loop");
    insertionsort(arr, size);
       printf("In aft loop");
    printf("The sorted array using insertion sort is :\n ");
    print(arr, size);
    return 0;
}