#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NAME_LEN 100
#define PHONE_LEN 9

struct contact {
    char name[MAX_NAME_LEN];
    char phone[PHONE_LEN];
    struct contact *left;
    struct contact *right;
};

// core operations
struct contact *insertContact(struct contact *root, char name[], char phone[]);
struct contact *deleteContact(struct contact *root, char name[]);
struct contact *searchContact(struct contact *root, char name[]);
void displayContacts(struct contact *root);
void freeContacts(struct contact *root);

// helper functions
void printMenu(void);

int main(void) {
    struct contact *root = NULL;
    int choice = 0;
    char name[MAX_NAME_LEN];
    char phone[PHONE_LEN];

    while (choice != 5) {
        printMenu();
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch(choice) {
            case 1:
               // Read contact name
                printf("\nEnter contact name: ");
                //fgets(name, MAX_NAME_LEN, stdin);
                //name[strcspn(name, "\n")] = '\0';  // Remove trailing newline if present
                scanf("%s", name);

                // Read phone number
                printf("Enter phone number: ");
                //fgets(phone, PHONE_LEN, stdin);
                //phone[strcspn(phone, "\n")] = '\0';  // Remove trailing newline if present
                scanf("%s", phone);

                root = insertContact(root, name, phone);
                printf("Contact created!\n");

                break;
            case 2:
                printf("\nEnter the name you wish to search: ");
                fgets(phone, PHONE_LEN, stdin);
                name[strcspn(name, "\n")] = '\0';

                struct contact *found = searchContact(root, name);
                found ? printf("Name: %s, Phone Number: %s\n", found->name, found->phone) 
                : printf("Contact not found.\n");
                break;
            case 3:
                printf("\nEnter contact to delete: ");
                fgets(phone, PHONE_LEN, stdin);
                name[strcspn(name, "\n")] = '\0';

                root = deleteContact(root, name);
                printf("Contact deleted.\n");
                break;
            case 4:
                printf("\nAll Contacts:\n");
                displayContacts(root);
                break;
            case 5:
                printf("\nExited Phonebook.\n");
                freeContacts(root);
                break;
            default:
                printf("\nPlease select a valid option.\n");
        }
    }
    
    return 0;
}

void printMenu(void) {
    printf("\n===== Phonebook Menu =====\n");
    printf("1. Add Contact\n");
    printf("2. Search Contact\n");
    printf("3. Delete Contact\n");
    printf("4. Display Contacts\n");
    printf("5. Exit Phonebook\n");
}

struct contact *insertContact(struct contact *root, char name[], char phone[]) {
    if (root == NULL) {
        struct contact *newNode = malloc(sizeof(struct contact));
        strcpy(newNode->name, name);
        strcpy(newNode->phone, phone);
        newNode->left = NULL;
        newNode->right = NULL;
        return newNode;
    }

    if (strcmp(name, root->name) < 0) {
        root->left = insertContact(root->left, name, phone);
    } else if (strcmp(name, root->name) > 0) {
        root->right = insertContact(root->right, name, phone);
    } 

    return root;
}

struct contact *deleteContact(struct contact *root, char name[]) {
    if (root == NULL) {
        return root;
    } else if (strcmp(name, root->name) < 0) {
        root->left = deleteContact(root->left, name);
    } else if (strcmp(name, root->name) > 0) {
        root->right = deleteContact(root->right, name);
    } else {
        if (root->left == NULL) {
            struct contact *temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct contact *temp = root->left;
            free(root);
            return temp;
        }
        

    }

    return root;
}

struct contact *searchContact(struct contact *root, char name[]) {
    if (root == NULL) {
        return root;
    } else if (strcmp(name, root->name) < 0) {
        return searchContact(root->left, name);
    } else if (strcmp(name, root->name) > 0) {
        return searchContact(root->right, name);
    } else {
        return root;
    }
}

void displayContacts(struct contact *root) {
    if (root == NULL) return;

    displayContacts(root->left);
    printf("Name: %s, Phone Number: %s\n", root->name, root->phone);
    displayContacts(root->right);
}

void freeContacts(struct contact *root) {
    if (root == NULL) return;

    freeContacts(root->left);
    freeContacts(root->right);
    free(root);
}