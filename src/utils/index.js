function mergeDataWithKey(data) {
  if (!data) {
    return []
  }
  return Object.values(data).map((value, index) => {
    return {
      ...value,
      key: Object.keys(data)[index],
    }
  })
}

export {mergeDataWithKey}
