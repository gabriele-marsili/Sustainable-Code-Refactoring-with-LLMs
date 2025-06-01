def distance(strand_a, strand_b):
    distance = 0
    if len(strand_a) == len(strand_b):
       for x in range(len(strand_a)):
           if strand_a[x] != strand_b[x]:
              distance += 1
       return distance
    else:
       raise ValueError("the two strand differ in length")
           
