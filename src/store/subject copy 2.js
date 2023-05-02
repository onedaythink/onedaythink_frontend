import { ref } from 'vue'

const subjects = ref([]);

function addSubject(subject) {
  subjects.value.push(subject);
}

function removeSubject(index) {
  subjects.value.splice(index, 1);
}

function updateSubject(index, newSubject) {
  subjects.value[index] = newSubject;
}

function getSubjects() {
  return subjects.value;
}

export {
  addSubject,
  removeSubject,
  updateSubject,
  getSubjects
}