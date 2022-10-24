/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        let el = document.createElement(tag);
        el.innerHTML = content;
        document.body.appendChild(el);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
let curLevel = 1;
let curClass = 'item_1';
export function generateTree(childrenCount, level) {
    if (level > curLevel) {
        let arr = document.body.querySelectorAll(`.item_${curLevel}`);
        if (arr.length == 0) {
            let root = document.createElement('div');
            root.className = 'item_1';
            document.body.append(root);
        }
        curClass = `item_${curLevel}`;
        arr = document.body.getElementsByClassName(`item_${curLevel}`);
        curLevel++;

        for (let item of arr) {
            for (let i = 0; i < childrenCount; i++) {
                let el = document.createElement('div');
                el.className = 'item_' + curLevel;
                item.append(el);
            }
        }
        generateTree(childrenCount, level);
    }
    return document.body.firstChild;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    curLevel = 1;
    curClass = 'item_1';
    generateTree(2, 3);
    let arr = document.body.querySelectorAll('.item_2');

    for (let item of arr) {
        var newTag = document.createElement('section');
        newTag.className = 'item_2';
        item.parentElement.insertBefore(newTag, item);
        var childNodes = item.childNodes;

        while (childNodes.length > 0) newTag.appendChild(childNodes[0]);

        item.parentElement.removeChild(item);
    }
    return document.body.firstChild;
}
