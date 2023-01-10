function merge(left, right) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left[0]);
      left.splice(0, 1);
    } else {
      result.push(right[0]);
      right.splice(0, 1);
    }
  }

  if (left.length > 0) {
    for (let i = 0; i < left.length; i++) {
      result.push(left[i]);
    }
  }

  if (right.length > 0) {
    for (let i = 0; i < right.length; i++) {
      result.push(right[i]);
    }
  }
  return result;
}

function merge_sort(m) {
  if (m.length <= 1) {
    return m;
  }

  let left = [];
  let right = [];

  for (let i = 0; i < m.length; i++) {
    if (i < m.length / 2) {
      left.push(m[i]);
    } else {
      right.push(m[i]);
    }
  }

  left = merge_sort(left);
  right = merge_sort(right);

  return merge(left, right);
}

export default merge_sort;
