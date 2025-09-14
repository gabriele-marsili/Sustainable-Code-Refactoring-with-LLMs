#include "react.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#define DEBUG(x)
#define MAX_CELLS 10
#define INITIAL_CALLBACK_POOL_SIZE 16

struct callback_data {
    struct callback_data *next;
    callback func;
    void *data;
    int id;
};

struct reactor {
    struct cell **cells;
    int n_cells;
    int capacity;
    struct callback_data *callback_pool;
    int pool_size;
    int pool_used;
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
    unsigned char dirty : 1;
};

static struct callback_data *get_callback_from_pool(struct reactor *r) {
    if (r->pool_used < r->pool_size) {
        return &r->callback_pool[r->pool_used++];
    }
    return malloc(sizeof(struct callback_data));
}

static void return_callback_to_pool(struct reactor *r, struct callback_data *cb) {
    if (cb >= r->callback_pool && cb < r->callback_pool + r->pool_size) {
        return;
    }
    free(cb);
}

struct reactor *create_reactor() {
    DEBUG(printf("Creating reactor\n"));
    struct reactor *r = malloc(sizeof(struct reactor));
    r->cells = malloc(sizeof(struct cell *) * MAX_CELLS);
    r->n_cells = 0;
    r->capacity = MAX_CELLS;
    r->callback_pool = malloc(sizeof(struct callback_data) * INITIAL_CALLBACK_POOL_SIZE);
    r->pool_size = INITIAL_CALLBACK_POOL_SIZE;
    r->pool_used = 0;
    return r;
}

void update_reactor(struct reactor *r) {
    DEBUG(printf("Updating reactor\n"));
    for(int i = 0; i < r->n_cells; i++) {
        if (r->cells[i]->dirty) {
            DEBUG(printf("Next %p\n", (void *)r->cells[i]));
            r->cells[i]->update(r->cells[i]);
            r->cells[i]->dirty = 0;
        }
    }
}

struct cell *create_cell(struct reactor *r, void update(struct cell *),
        void *func, int value) {
    struct cell *c = malloc(sizeof(struct cell));
    if (r->n_cells >= r->capacity) {
        r->capacity *= 2;
        r->cells = realloc(r->cells, sizeof(struct cell *) * r->capacity);
    }
    r->cells[r->n_cells++] = c;
    c->reactor = r;
    c->value = value;
    c->update = update;
    c->func = func;
    c->callbacks = NULL;
    c->ids = 0;
    c->inputs = NULL;
    c->n_inputs = 0;
    c->dirty = 0;
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
    while (p != NULL) {
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
    c->inputs = malloc(sizeof(struct cell *));
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
    c->inputs = malloc(sizeof(struct cell *) * 2);
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
        
        for (int i = 0; i < c->reactor->n_cells; i++) {
            struct cell *cell = c->reactor->cells[i];
            for (int j = 0; j < cell->n_inputs; j++) {
                if (cell->inputs[j] == c) {
                    cell->dirty = 1;
                    break;
                }
            }
        }
        update_reactor(c->reactor);
    }
}

void destroy_reactor(struct reactor *r) {
    DEBUG(printf("Destroying reactor %p\n", (void *)r));
    for (int i = 0; i < r->n_cells; i++) {
        struct cell *c = r->cells[i];
        struct callback_data *cb = c->callbacks;
        while (cb != NULL) {
            struct callback_data *next = cb->next;
            return_callback_to_pool(r, cb);
            cb = next;
        }
        free(c->inputs);
        free(c);
    }
    free(r->cells);
    free(r->callback_pool);
    free(r);
}

callback_id add_callback(struct cell *c, void *args, callback func) {
    DEBUG(printf("Adding callback to %p: %d\n", (void *)c, c->ids));
    struct callback_data *state = get_callback_from_pool(c->reactor);
    state->func = func;
    state->data = args;
    state->id = c->ids++; 
    state->next = c->callbacks;
    c->callbacks = state;
    return state->id;
}

void remove_callback(struct cell *c, callback_id id) {
    struct callback_data *prev = NULL;
    DEBUG(printf("Removing callback from %p: %d\n", (void *)c, id));
    struct callback_data *data = c->callbacks;
    while (data != NULL) {
        if (data->id == id) {
            if (prev == NULL) {
                c->callbacks = data->next;
            } else {
                prev->next = data->next;
            }
            return_callback_to_pool(c->reactor, data);
            return;
        }
        prev = data;
        data = data->next;
    }
}