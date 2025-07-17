<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // или quill.bubble.css, в зависимости от того, какой стиль нужен
import 'quill-table'; // Импортируем плагин для таблиц

// Реф для контейнера редактора
const editorContainer = ref<HTMLElement | null>(null);

// Объявляем переменную для Quill глобально
let quill: Quill | null = null;

// Функция для вставки таблицы с выбранными размерами
const insertTable = (rows: number, cols: number) => {
  if (!quill) return;

  let tableHTML = '<table border="1" style="width: 100%; text-align: left;">';

  // Генерация строк и ячеек таблицы
  for (let i = 0; i < rows; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < cols; j++) {
      tableHTML += `<td contenteditable="true">Ячейка ${i + 1},${j + 1}</td>`;
    }
    tableHTML += '</tr>';
  }

  tableHTML += '</table>';

  const range = quill.getSelection();
  if (range) {
    quill.clipboard.dangerouslyPasteHTML(range.index, tableHTML);
  } else {
    console.warn('No selection range available.');
  }
};

// Функция для удаления таблицы
const deleteTable = () => {
  if (!quill) return;

  const selection = quill.getSelection();
  if (!selection) return;

  const range = selection.index;
  const cursorPosition = quill.root.childNodes[range];

  // Поиск ближайшего элемента <table> вокруг курсора
  let tableElement: HTMLElement | null = null;
  if (cursorPosition) {
    tableElement = cursorPosition.closest('table');
  }

  if (tableElement) {
    tableElement.remove(); // Удаляем таблицу
  } else {
    alert('Таблица не найдена');
  }
};

// Инициализация Quill
onMounted(() => {
  if (editorContainer.value) {
    const options = {
      theme: 'snow',  // или 'bubble' для другого стиля
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ align: [] }],
          ['blockquote', 'code-block'],
          ['video'], // Включаем кнопку для вставки видео
          ['table'], // Включаем кнопку для вставки таблиц
          ['deleteTable'], // Добавляем кнопку для удаления таблицы
        ],
      },
    };

    // Инициализируем Quill
    quill = new Quill(editorContainer.value, options);

    // Добавляем кастомный обработчик для вставки видео с Rutube
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('video', function () {
      const videoUrl = prompt('Введите ссылку на видео с Rutube (например, https://rutube.ru/video/123456789/)');
      if (videoUrl) {
        // Извлекаем ID видео из URL
        const videoId = videoUrl.match(/rutube\.ru\/video\/([^/]+)/);

        if (videoId && videoId[1]) {
          const videoEmbed = `<iframe src="https://rutube.ru/play/embed/${videoId[1]}" width="460" height="215" frameborder="0" allowfullscreen></iframe>`;
          const range = quill.getSelection();
          if (range) {
            quill.clipboard.dangerouslyPasteHTML(range.index, videoEmbed);
          }
        } else {
          alert('Не удалось извлечь ID видео из ссылки.');
        }
      }
    });

    // Добавляем кастомный обработчик для вставки таблицы
    toolbar.addHandler('table', function () {
      const rows = prompt('Введите количество строк для таблицы:');
      const cols = prompt('Введите количество столбцов для таблицы:');
      if (rows && cols) {
        insertTable(parseInt(rows), parseInt(cols));
      }
    });

    // Добавляем кастомный обработчик для удаления таблицы
    toolbar.addHandler('deleteTable', function () {
      deleteTable();
    });
  }
});
</script>

<template>
  <!-- Контейнер для Quill редактора -->
  <div ref="editorContainer" style="height: 300px;"></div>
</template>

<style scoped>
/* Дополнительные стили для редактора */

/* Стили для таблицы */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

td {
  border: 1px solid black;
  padding: 10px;
  resize: both; /* Позволяет изменять размер ячеек */
  overflow: hidden;
  min-width: 50px; /* Минимальная ширина ячеек */
}

table td {
  position: relative;
}

/* Вспомогательные элементы для изменения размера ячеек */
table td::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 5px;
  height: 5px;
  background-color: #000;
  cursor: se-resize;
}
</style>
