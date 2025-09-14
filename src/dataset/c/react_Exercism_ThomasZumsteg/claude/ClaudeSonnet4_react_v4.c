#include "react.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#define DEBUG(x)
#define INITIAL_CAPACITY 16

struct reactor {
    struct cell **cells;
    int n_cells;
    int capacity;
};

struct cell {
    int value;
    void (*update)(struct cell *);
    struct reactor *reactor;
    void *func;
    struct cell **inputs;
    int n_inputs;
    callback_id ids;
    struct callback_data *callbacks;
};

struct callback_data {
    struct callback_data *next;
    callback func;
    void *data;
    int id;
};

struct reactor *create_reactor() {
    DEBUG(printf("Creating reactor\n"));
    struct reactor *r = malloc(sizeof(struct reactor));
    if (!r) return NULL;
    r->cells = malloc(sizeof(struct cell *) * INITIAL_CAPACITY);
    if (!r->cells) {
        free(r);
        return NULL;
    }
    r->n_cells = 0;
    r->capacity = INITIAL_CAPACITY;
    return r;
}

static int resize_reactor(struct reactor *r) {
    int new_capacity = r->capacity * 2;
    struct cell **new_cells = realloc(r->cells, sizeof(struct cell *) * new_capacity);
    if (!new_cells) return 0;
    r->cells = new_cells;
    r->capacity = new_capacity;
    return 1;
}

void update_reactor(struct reactor *r) {
    DEBUG(printf("Updating reactor\n"));
    const int n = r->n_cells;
    struct cell **cells = r->cells;
    for(int i = 0; i < n; i++) {
        DEBUG(printf("Next %p\n", (void *)cells[i]));
        cells[i]->update(cells[i]);
    }
}

struct cell *create_cell(struct reactor *r, void update(struct cell *),
        void *func, int value) {
    if (r->n_cells >= r->capacity && !resize_reactor(r)) {
        return NULL;
    }
    
    struct cell *c = malloc(sizeof(struct cell));
    if (!c) return NULL;
    
    r->cells[r->n_cells++] = c;
    c->reactor = r;
    c->value = value;
    c->update = update;
    c->func = func;
    c->callbacks = NULL;
    c->ids = 0;
    c->inputs = NULL;
    c->n_inputs = 0;
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

static inline void run_callbacks(struct cell *c) {
    struct callback_data *p = c->callbacks;
    while (p) {
        DEBUG(printf("Running callback %p: %d\n", (void *)c, p->id));
        p->func(p->data, c->value);
        p = p->next;
    }
}

void update_compute1(struct cell *c) {
    DEBUG(printf("Compute 1 update\n"));
    int new_value = ((compute1)c->func)(c->inputs[0]->value);
    if (new_value != c->value) {
        c->value = new_value;
        run_callbacks(c);
    }
}

struct cell *create_compute1_cell(struct reactor *r, struct cell *input,
        compute1 func) {
    DEBUG(printf("Creating compute1 cell \n"));
    struct cell *c = create_cell(r, update_compute1, (void *)func,
            func(input->value));
    if (!c) return NULL;
    
    c->inputs = malloc(sizeof(struct cell *));
    if (!c->inputs) {
        free(c);
        return NULL;
    }
    c->inputs[0] = input;
    c->n_inputs = 1;
    return c;
}

void update_compute2(struct cell *c) {
    DEBUG(printf("Compute 2 update\n"));
    int new_value = ((compute2)c->func)(c->inputs[0]->value, c->inputs[1]->value);
    if (new_value != c->value) {
        c->value = new_value;
        run_callbacks(c);
    }
}

struct cell *create_compute2_cell(struct reactor *r, struct cell *input1,
        struct cell *input2, compute2 func) {
    DEBUG(printf("Creating compute2 cell\n"));
    struct cell *c = create_cell(r, update_compute2, (void *)func, 
            func(input1->value, input2->value));
    if (!c) return NULL;
    
    c->inputs = malloc(sizeof(struct cell *) * 2);
    if (!c->inputs) {
        free(c);
        return NULL;
    }
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
    if (new_value != c->value) {
        c->value = new_value;
        run_callbacks(c);
        update_reactor(c->reactor);
    }
}

void destroy_reactor(struct reactor *r) {
    DEBUG(printf("Destroying reactor %p\n", (void *)r));
    if (r) {
        if (r->cells) {
            for (int i = 0; i < r->n_cells; i++) {
                if (r->cells[i]) {
                    struct callback_data *cb = r->cells[i]->callbacks;
                    while (cb) {
                        struct callback_data *next = cb->next;
                        free(cb);
                        cb = next;
                    }
                    free(r->cells[i]->inputs);
                    free(r->cells[i]);
                }
            }
            free(r->cells);
        }
        free(r);
    }
}

callback_id add_callback(struct cell *c, void *args, callback func) {
    DEBUG(printf("Adding callback to %p: %d\n", (void *)c, c->ids));
    struct callback_data *state = malloc(sizeof(struct callback_data));
    if (!state) return -1;
    
    state->func = func;
    state->data = args;
    state->id = c->ids++; 
    state->next = c->callbacks;
    c->callbacks = state;
    return state->id;
}

void remove_callback(struct cell *c, callback_id id) {
    DEBUG(printf("Removing callback from %p: %d\n", (void *)c, id));
    struct callback_data **current = &c->callbacks;
    
    while (*current) {
        if ((*current)->id == id) {
            struct callback_data *to_remove = *current;
            *current = (*current)->next;
            free(to_remove);
            return;
        }
        current = &(*current)->next;
    }
}