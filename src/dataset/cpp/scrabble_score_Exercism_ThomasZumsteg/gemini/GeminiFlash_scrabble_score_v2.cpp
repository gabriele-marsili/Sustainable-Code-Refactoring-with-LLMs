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

// Optimized function to calculate cosine similarity between two vectors
double cosine_similarity(const vector<double>& vec1, const vector<double>& vec2) {
    return dot_product(vec1, vec2); // Assuming vectors are already normalized
}

// Example usage (not part of the optimized functions, but demonstrates usage)
int main() {
    vector<double> v1 = {1.0, 2.0, 3.0};
    vector<double> v2 = {4.0, 5.0, 6.0};

    normalize_vector(v1);
    normalize_vector(v2);

    double similarity = cosine_similarity(v1, v2);
    cout << "Cosine Similarity: " << similarity << endl;

    return 0;
}