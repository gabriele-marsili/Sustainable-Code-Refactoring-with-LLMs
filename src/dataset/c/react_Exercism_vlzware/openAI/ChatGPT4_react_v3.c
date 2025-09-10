#include "react.h"
#include <stdlib.h>
#include <stdio.h>

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
	if (r_global) {
		fprintf(stderr, "Only one reactor possible!\n");
		return NULL;
	}
	r_global = malloc(sizeof(struct reactor));
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
	struct cell* tmp = malloc(sizeof(struct cell));
	check_alloc(tmp);

	tmp->next = r->head;
	tmp->val = initial_value;
	tmp->type = INPUT;
	tmp->deps = NULL;

	for (int i = 0; i < MAXCLB; i++)
		tmp->clb[i] = NULL;

	r->head = tmp;

	return tmp;
}

struct cell *create_compute1_cell(struct reactor *r, struct cell *c, compute1 fun)
{
	int val = fun(get_cell_value(c));

	struct cell *res = create_input_cell(r, val);
	res->type = ONE_VAR;
	res->fun1 = fun;
	res->dep_a = c;

	add_deps(c, res);

	return res;
}

struct cell *create_compute2_cell(struct reactor *r, struct cell *ca, struct cell *cb, compute2 fun)
{
	int val = fun(get_cell_value(ca), get_cell_value(cb));

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
	return c ? c->val : -1;
}

void set_cell_value(struct cell *c, int new_value)
{
	if (!c || c->val == new_value) return;

	set_state(r_global->head);
	scv_helper(c, new_value);
	parse_state(r_global->head);
}

callback_id add_callback(struct cell *c, void *v, callback call)
{
	for (callback_id res = 0; res < MAXCLB; res++) {
		if (!c->clb[res]) {
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
	if (id >= 0 && id < MAXCLB)
		c->clb[id] = NULL;
	else
		fprintf(stderr, "Invalid callback_id!\n");
}

/*
 ****************************************************
 * helpers
 ****************************************************
 */

void set_state(struct cell *p)
{
	while (p) {
		p->clb_fire = 0;
		p = p->next;
	}
}

void parse_state(struct cell *p)
{
	while (p) {
		if (p->clb_fire) {
			call_deps(p);
			for (int i = 0; i < MAXCLB; i++) {
				if (p->clb[i])
					p->clb[i](p->clb_obj[i], p->val);
			}
		}
		p = p->next;
	}
}

void scv_helper(struct cell *c, int new_value)
{
	if (c && c->val != new_value) {
		c->val = new_value;
		c->clb_fire = 1;
	}
}

void check_alloc(void *p)
{
	if (!p) {
		fprintf(stderr, "Memory error!\n");
		exit(1);
	}
}

void free_list(struct cell *p)
{
	while (p) {
		struct cell *next = p->next;
		free_deps(p->deps);
		free(p);
		p = next;
	}
}

void free_deps(struct dep *p)
{
	while (p) {
		struct dep *next = p->next;
		free(p);
		p = next;
	}
}

int add_deps(struct cell *c, struct cell *dst)
{
	struct dep* tmp = malloc(sizeof(struct dep));
	check_alloc(tmp);

	tmp->next = c->deps;
	tmp->dep = dst;
	c->deps = tmp;

	return 0;
}

void call_deps(struct cell *c)
{
	for (struct dep *dp = c->deps; dp; dp = dp->next) {
		struct cell *tmp = dp->dep;
		if (tmp->type == ONE_VAR)
			scv_helper(tmp, tmp->fun1(c->val));
		else if (tmp->type == TWO_VARS)
			scv_helper(tmp, tmp->fun2(tmp->dep_a->val, tmp->dep_b->val));
	}
}