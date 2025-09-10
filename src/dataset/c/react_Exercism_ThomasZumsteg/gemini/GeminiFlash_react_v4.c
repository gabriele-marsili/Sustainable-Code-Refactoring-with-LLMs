#include "react.h"
#include <stdlib.h>
#include <stdio.h>

#define DEBUG(x)
#define MAX_CELLS 10

struct reactor {
    struct cell *cells[MAX_CELLS];
    int n_cells;
};

struct cell {
    int value;
    void (*update)(struct cell *);
    struct reactor *reactor;
    void *func;
    struct cell *inputs[2];
    int n_inputs;
    callback_id ids;
    struct callback_data *callbacks;
};

struct reactor *create_reactor() {
    DEBUG(printf("Creating reactor\n"));
    struct reactor *r = (struct reactor*)malloc(sizeof(struct reactor));
    if (!r) return NULL;
    r->n_cells = 0;
    return r;
}

void update_reactor(struct reactor *r) {
    DEBUG(printf("Updating reactor\n"));
    for(int i = 0; i < r->n_cells; i++) {
        DEBUG(printf("Next %p\n", (void *)r->cells[i]));
        r->cells[i]->update(r->cells[i]);
    }
}

struct cell *create_cell(struct reactor *r, void (*update)(struct cell *),
        void *func, int value) {
    if (r->n_cells >= MAX_CELLS) return NULL;

    struct cell *c = (struct cell*)malloc(sizeof(struct cell));
    if (!c) return NULL;

    c->reactor = r;
    c->value = value;
    c->update = update;
    c->func = func;
    c->callbacks = NULL;
    c->ids = 0;
    r->cells[r->n_cells++] = c;
    return c;
}

void noop(struct cell *input) {
    DEBUG(printf("Input update\n"));
    (void)input;
}

struct cell *create_input_cell(struct reactor *r, int initial_value) {
    DEBUG(printf("Creating input cell\n"));
    return create_cell(r, noop, NULL, initial_value);
}

struct callback_data {
    struct callback_data *next;
    callback func;
    void *data;
    int id;
};

void run_callbacks(struct cell *c) {
    struct callback_data *p = c->callbacks;
    while(p != NULL) {
        DEBUG(printf("Running callback %p: %d\n", (void *)c, p->id));
        p->func(p->data, c->value);
        p = p->next;
    }
}

void update_compute1(struct cell *c) {
    DEBUG(printf("Compute 1 update\n"));
    int new_value = ((compute1)c->func)(c->inputs[0]->value);
    if( new_value == c->value)
        return;
    c->value = new_value;
    run_callbacks(c);
}

struct cell *create_compute1_cell(struct reactor *r, struct cell *input,
        compute1 func) {
    DEBUG(printf("Creating compute1 cell \n"));
    struct cell *c = create_cell(r, update_compute1, (void *)func,
            func(input->value));
    if (!c) return NULL;
    c->inputs[0] = input;
    c->n_inputs = 1;
    return c;
}

void update_compute2(struct cell *c) {
    DEBUG(printf("Compute 2 update\n"));
    int new_value = ((compute2)c->func)(c->inputs[0]->value,
            c->inputs[1]->value);
    if(new_value == c->value)
        return;
    c->value = new_value;
    run_callbacks(c);
}

struct cell *create_compute2_cell(struct reactor *r, struct cell *input1,
        struct cell *input2, compute2 func) {
    DEBUG(printf("Creating compute2 cell\n"));
    struct cell *c = create_cell(r, update_compute2, (void *)func, 
            func(input1->value, input2->value));
    if (!c) return NULL;
    c->inputs[0] = input1;
    c->inputs[1] = input2;
    c->n_inputs = 2;
    return c;
}

int get_cell_value(struct cell *c) {
    DEBUG(printf("Getting cell value %p\n", (void *)c));
    return c->value;
}

void set_cell_value(struct cell *c, int new_value) {
    DEBUG(printf("Setting cell value %p: %d\n", (void *)c, new_value));
    if(new_value == c->value)
        return;
    c->value = new_value;
    run_callbacks(c);
}

void destroy_reactor(struct reactor *r) {
    DEBUG(printf("Destroying reactor %p\n", (void *)r));
    free(r);
}

callback_id add_callback(struct cell *c, void *args, callback func) {
    DEBUG(printf("Adding callback to %p: %d\n", (void *)c, c->ids));
    struct callback_data *state = (struct callback_data*)malloc(sizeof(struct callback_data));
    if (!state) return -1;

    state->func = func;
    state->data = args;
    state->id = c->ids++; 
    state->next = c->callbacks;
    c->callbacks = state;
    return state->id;
}

void remove_callback(struct cell *c, callback_id id) {
    struct callback_data *prev = NULL;
    struct callback_data *data = c->callbacks;

    DEBUG(printf("Removing callback from %p: %d\n", (void *)c, id));

    while (data != NULL) {
        if (data->id == id) {
            if (prev == NULL) {
                c->callbacks = data->next;
            } else {
                prev->next = data->next;
            }
            free(data);
            return;
        }
        prev = data;
        data = data->next;
    }
}