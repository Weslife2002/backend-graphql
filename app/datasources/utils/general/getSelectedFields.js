const union = require('./union');

function getRawSelectedFieldsRecursive(selections) {
  let selectedFields = [];
  selections.forEach(
    selection => {
      if (selection.selectionSet) {
        selectedFields = union(selectedFields, getRawSelectedFieldsRecursive(selection.selectionSet.selections)
          .map(SelectedField => `${selection.name.value}.${SelectedField}`));
      } else {
        selectedFields = union(selectedFields, [selection.name.value]);
      }
    },
  );
  return selectedFields;
}

function getRawSelectedFields(selections) {
  let selectedFields = [];
  selections.forEach(
    selection => {
      selection.selectionSet.selections.forEach(
        subselection => {
          selectedFields = union(selectedFields, [subselection.name.value]);
        },
      );
    },
  );
  return selectedFields;
}

function getLastSelectedFieldsRecursive(selections) {
  let selectedFields = [];
  selections.forEach(
    selection => {
      if (selection.selectionSet) {
        selectedFields = union(selectedFields, getRawSelectedFieldsRecursive(selection.selectionSet.selections));
      } else {
        selectedFields = union(selectedFields, [selection.name.value]);
      }
    },
  );
  return selectedFields;
}

function getSelectedFields(info, options = {}) {
  const { additionalFields = [], recursive = false, lastOnly = false } = options;
  if (!recursive) {
    const selectedFields = getRawSelectedFields(info.fieldNodes);
    const finalSelectedFields = union(selectedFields, additionalFields);
    return finalSelectedFields;
  }
  if (lastOnly) {
    return getLastSelectedFieldsRecursive(info.fieldNodes);
  }
  const selectedFields = getRawSelectedFieldsRecursive(info.fieldNodes).map(
    rawSelectedField => rawSelectedField.match(/\..+/)[0].substring(1),
  );
  const finalSelectedFields = union(selectedFields, additionalFields);
  return finalSelectedFields;
}

module.exports = getSelectedFields;
