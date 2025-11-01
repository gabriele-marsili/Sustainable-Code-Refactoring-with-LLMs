#include "linked_list.h"
#include <stdlib.h>

struct list_node {
   struct list_node *prev, *next;
   ll_data_t data;
};

struct list {
   struct list_node *first, *last;
};

struct list *list_create(void)
{
   struct list* _list = (struct list*)malloc(sizeof(struct list));
   if(_list == NULL)
   {
      return NULL;
   }
   _list->first = NULL;
   _list->last = NULL;
   
   return _list;
}

size_t list_count(const struct list *list)
{
   size_t count = 0;
   struct list_node* current = list->first;
   while (current != NULL) {
       count++;
       current = current->next;
   }
   return count;
}

void list_push(struct list *list, ll_data_t item_data)
{
   struct list_node* new_node = (struct list_node*)malloc(sizeof(struct list_node));
   if (new_node == NULL) return;

   new_node->data = item_data;
   new_node->next = NULL;

   if (list->last == NULL) {
       new_node->prev = NULL;
       list->first = new_node;
       list->last = new_node;
   } else {
       new_node->prev = list->last;
       list->last->next = new_node;
       list->last = new_node;
   }
}

ll_data_t list_pop(struct list *list)
{
   if (list->last == NULL) return -1;

   struct list_node* last_node = list->last;
   ll_data_t data = last_node->data;

   list->last = last_node->prev;

   if (list->last == NULL) {
       list->first = NULL;
   } else {
       list->last->next = NULL;
   }

   free(last_node);
   return data;
}

void list_unshift(struct list *list, ll_data_t item_data)
{
   struct list_node* new_node = (struct list_node*)malloc(sizeof(struct list_node));
   if (new_node == NULL) return;

   new_node->data = item_data;
   new_node->prev = NULL;

   if (list->first == NULL) {
       new_node->next = NULL;
       list->first = new_node;
       list->last = new_node;
   } else {
       new_node->next = list->first;
       list->first->prev = new_node;
       list->first = new_node;
   }
}

ll_data_t list_shift(struct list *list)
{
   if (list->first == NULL) return -1;

   struct list_node* first_node = list->first;
   ll_data_t data = first_node->data;

   list->first = first_node->next;

   if (list->first == NULL) {
       list->last = NULL;
   } else {
       list->first->prev = NULL;
   }

   free(first_node);
   return data;
}

void list_delete(struct list *list, ll_data_t data)
{
   struct list_node* current = list->first;

   while (current != NULL) {
       if (current->data == data) {
           if (current->prev != NULL) {
               current->prev->next = current->next;
           } else {
               list->first = current->next;
           }

           if (current->next != NULL) {
               current->next->prev = current->prev;
           } else {
               list->last = current->prev;
           }

           struct list_node* temp = current;
           current = current->next;
           free(temp);
       } else {
           current = current->next;
       }
   }
}

void list_destroy(struct list *list)
{
   struct list_node* current = list->first;
   while (current != NULL) {
       struct list_node* next = current->next;
       free(current);
       current = next;
   }
   free(list);
}