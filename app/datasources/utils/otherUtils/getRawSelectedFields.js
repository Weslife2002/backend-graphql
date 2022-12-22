function getRawSelectedFields(selectionSet) {
  let rawSelectedFields = [];
  selectionSet.selections.forEach(
    selection => {
      if (selection.selectionSet) {
        rawSelectedFields = rawSelectedFields.concat(getRawSelectedFields(selection.selectionSet)
          .map(SelectedField => `${selection.name.value}.${SelectedField}`));
      } else {
        rawSelectedFields = rawSelectedFields.concat(selection.name.value);
      }
    },
  );
  return rawSelectedFields;
}

module.exports = getRawSelectedFields;
