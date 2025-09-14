#include "react.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void check_alloc(void *p);
void free_list(struct cell* p);
void free_deps(struct dep* p);
int add_deps(struct cell *c, struct cell *dst);
void call_deps(struct cell *c);
void scv_helper(struct cell *c, int new_value);
void set_state(struct cell *p);
void parse_state(struct cell *p);

struct reactor *r_global = NULL;

struct reactor *create_reactor()
{
	if (r_global != NULL) {
		fprintf(stderr, "Only one reactor possible!\n");
		return NULL;
	}
	r_global = (struct reactor*) malloc(sizeof(struct reactor));
	check_alloc(r_global);

	r_global->head = NULL;

	return r_global;
}

void destroy_reactor(struct reactor *r)
{
	if (r != r_global) {
		fprintf(stderr, "Invalid reactor!\n");
		return;
	}
	free_list(r_global->head);
	free(r_global);
	r_global = NULL;
}

struct cell *create_input_cell(struct reactor *r, int initial_value)
{
	struct cell* tmp = (struct cell*) malloc(sizeof(struct cell));
	check_alloc(tmp);

	tmp->next = r->head;
	tmp->val = initial_value;
	tmp->type = INPUT;
	tmp->deps = NULL;
	memset(tmp->clb, 0, MAXCLB * sizeof(callback));

	r->head = tmp;

	return r->head;
}

struct cell *create_compute1_cell(struct reactor *r, struct cell *c,
				  compute1 fun)
{
	int val = fun(c->val);

	struct cell *res = create_input_cell(r, val);
	res->type = ONE_VAR;
	res->fun1 = fun;
	res->dep_a = c;

	add_deps(c, res);

	return res;
}

struct cell *create_compute2_cell(struct reactor *r, struct cell *ca,
				  struct cell *cb, compute2 fun)
{
	int val = fun(ca->val, cb->val);

	struct cell *res = create_input_cell(r, val);
	res->type = TWO_VARS;
	res->fun2 = fun;
	res->dep_a = ca;
	res->dep_b = cb;

	add_deps(ca, res);
	add_deps(cb, res);

	return res;
}

int get_cell_value(struct cell *c)
{
	return (c != NULL) ? c->val : -1;
}

void set_cell_value(struct cell *c, int new_value)
{
	if (c == NULL || c->val == new_value)
		return;

	set_state(r_global->head);
	scv_helper(c, new_value);
	parse_state(r_global->head);
}

callback_id add_callback(struct cell *c, void *v, callback call)
{
	for (callback_id res = 0; res < MAXCLB; res++) {
		if (c->clb[res] == NULL) {
			c->clb[res] = call;
			c->clb_obj[res] = v;
			return res;
		}
	}
	
	fprintf(stderr, "MAXCLB reached!\n");
	return -1;
}

void remove_callback(struct cell *c, callback_id id)
{
	if (id >= 0 && id < MAXCLB) {
		c->clb[id] = NULL;
	} else {
		fprintf(stderr, "Invalid callback_id!\n");
	}
}

void set_state(struct cell *p)
{
	while (p != NULL) {
		p->clb_fire = 0;
		p = p->next;
	}
}

void parse_state(struct cell *p)
{
	struct cell *stack[1024];
	int stack_size = 0;
	
	while (p != NULL) {
		if (stack_size < 1024) {
			stack[stack_size++] = p;
		}
		p = p->next;
	}
	
	for (int i = stack_size - 1; i >= 0; i--) {
		p = stack[i];
		if (p->clb_fire == 0)
			continue;

		call_deps(p);

		for (int j = 0; j < MAXCLB; j++) {
			if (p->clb[j] != NULL) {
				p->clb[j](p->clb_obj[j], p->val);
			}
		}
	}
}

void scv_helper(struct cell *c, int new_value)
{
	if (c != NULL && c->val != new_value) {
		c->val = new_value;
		c->clb_fire = 1;
	}
}

void check_alloc(void *p)
{
	if (p == NULL) {
		fprintf(stderr, "Memory error!\n");
		exit(1);
	}
}

void free_list(struct cell *p)
{
	while (p != NULL) {
		struct cell *next = p->next;
		
		if (p->deps != NULL) {
			free_deps(p->deps);
		}
		
		free(p);
		p = next;
	}
}

void free_deps(struct dep *p)
{
	while (p != NULL) {
		struct dep *next = p->next;
		free(p);
		p = next;
	}
}

int add_deps(struct cell *c, struct cell *dst)
{
	struct dep* tmp = (struct dep*) malloc(sizeof(struct dep));
	check_alloc(tmp);

	tmp->next = c->deps;
	tmp->dep = dst;
	c->deps = tmp;

	return 0;
}

void call_deps(struct cell *c)
{
	struct dep *dp = c->deps;
	while (dp != NULL) {
		struct cell *tmp = dp->dep;
		if (tmp->type == ONE_VAR) {
			scv_helper(tmp, tmp->fun1(c->val));
		} else if (tmp->type == TWO_VARS) {
			scv_helper(tmp, tmp->fun2(tmp->dep_a->val, tmp->dep_b->val));
		}
		dp = dp->next;
	}
}