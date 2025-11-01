#include "linked_list.h"
#include <stdlib.h>
#include <string.h>

struct list_node {
   struct list_node *prev, *next;
   ll_data_t data;
};

struct list {
   struct list_node *first, *last;
   size_t count;
};

struct list *list_create(void)
{
   struct list* _list = malloc(sizeof(struct list));
   if(_list == NULL)
   {
      return NULL;
   }
   _list->first = NULL;
   _list->last = NULL;
   _list->count = 0;
   
   return _list;
}

size_t list_count(const struct list *list)
{
   return list->count;
}

void list_push(struct list *list, ll_data_t item_data)
{
   struct list_node* newNode = malloc(sizeof(struct list_node));
   if(newNode == NULL) return;
   
   newNode->data = item_data;
   newNode->next = NULL;
   newNode->prev = list->last;
   
   if(list->last)
   {
      list->last->next = newNode;
   }
   else
   {
      list->first = newNode;
   }
   list->last = newNode;
   list->count++;
}

ll_data_t list_pop(struct list *list)
{
   if(list->last == NULL) return -1;
   
   struct list_node* to_remove = list->last;
   ll_data_t data = to_remove->data;
   list->last = to_remove->prev;

   if(list->last != NULL)
      list->last->next = NULL;
   else
      list->first = NULL;
      
   free(to_remove);
   list->count--;
   return data;
}

void list_unshift(struct list *list, ll_data_t item_data)
{
   struct list_node* new_first = malloc(sizeof(struct list_node));
   if(new_first == NULL) return;
   
   new_first->data = item_data;
   new_first->prev = NULL;
   new_first->next = list->first;
   
   if(list->first != NULL)
      list->first->prev = new_first;
   else
      list->last = new_first;
      
   list->first = new_first;
   list->count++;
}

ll_data_t list_shift(struct list *list)
{
   if(list->first == NULL) return -1;

   struct list_node* to_remove = list->first;
   ll_data_t result = to_remove->data;
   list->first = to_remove->next;

   if(list->first != NULL)
      list->first->prev = NULL;
   else
      list->last = NULL;
      
   free(to_remove);
   list->count--;
   return result;
}

void list_delete(struct list *list, ll_data_t data)
{
   struct list_node* current_node = list->first;
   while (current_node != NULL && current_node->data != data)
   {
      current_node = current_node->next;
   }
   if(current_node == NULL) return;
   
   if(current_node->prev != NULL)
      current_node->prev->next = current_node->next;
   else
      list->first = current_node->next;
      
   if(current_node->next != NULL)
      current_node->next->prev = current_node->prev;
   else
      list->last = current_node->prev;

   free(current_node);
   list->count--;
}

void list_destroy(struct list *list)
{
   struct list_node* current = list->first;
   while (current != NULL)
   {
      struct list_node* next = current->next;
      free(current);
      current = next;
   }
   free(list);   
}