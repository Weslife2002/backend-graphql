function getRawSelectedFields(selectionSet) {
  let selectedFields = [];
  selectionSet.selections.forEach(
    selection => {
      if (selection.selectionSet) {
        selectedFields = selectedFields.concat(getRawSelectedFields(selection.selectionSet)
          .map(SelectedField => `${selection.name.value}.${SelectedField}`));
      } else {
        selectedFields = selectedFields.concat(selection.name.value);
      }
    },
  );
  return selectedFields;
}

module.exports = getRawSelectedFields;
