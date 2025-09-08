#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Optimized function to calculate the dot product of two vectors
double dot_product(const vector<double>& vec1, const vector<double>& vec2) {
    size_t n = min(vec1.size(), vec2.size());
    double result = 0.0;
    for (size_t i = 0; i < n; ++i) {
        result += vec1[i] * vec2[i];
    }
    return result;
}

// Optimized function to normalize a vector in-place
void normalize_vector(vector<double>& vec) {
    double magnitude = 0.0;
    for (double val : vec) {
        magnitude += val * val;
    }
    magnitude = sqrt(magnitude);

    if (magnitude > 1e-9) { // Avoid division by zero or very small numbers
        for (double& val : vec) {
            val /= magnitude;
        }
    } else {
        // Handle the case where the vector is close to zero.  Either set to zero vector or leave as is.
        // Here, we set it to zero vector.
        for(double& val : vec) {
            val = 0.0;
        }
    }
}

// Optimized function to add two vectors in-place
void add_vectors(vector<double>& vec1, const vector<double>& vec2) {
    size_t n = min(vec1.size(), vec2.size());
    for (size_t i = 0; i < n; ++i) {
        vec1[i] += vec2[i];
    }
}

// Optimized function to subtract two vectors in-place
void subtract_vectors(vector<double>& vec1, const vector<double>& vec2) {
    size_t n = min(vec1.size(), vec2.size());
    for (size_t i = 0; i < n; ++i) {
        vec1[i] -= vec2[i];
    }
}

// Optimized function to scale a vector in-place
void scale_vector(vector<double>& vec, double scalar) {
    for (double& val : vec) {
        val *= scalar;
    }
}

// Example usage (can be removed if not needed for the specific task)
int main() {
    vector<double> v1 = {1.0, 2.0, 3.0};
    vector<double> v2 = {4.0, 5.0, 6.0};

    cout << "Dot product: " << dot_product(v1, v2) << endl;

    normalize_vector(v1);
    cout << "Normalized v1: ";
    for (double val : v1) {
        cout << val << " ";
    }
    cout << endl;

    add_vectors(v1, v2);
    cout << "v1 + v2: ";
    for (double val : v1) {
        cout << val << " ";
    }
    cout << endl;

    subtract_vectors(v1, v2);
     cout << "v1 - v2: ";
    for (double val : v1) {
        cout << val << " ";
    }
    cout << endl;

    scale_vector(v1, 2.0);
    cout << "v1 * 2: ";
    for (double val : v1) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}