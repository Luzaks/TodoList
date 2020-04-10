function createElem(elemTag) {
    return document.createElement(elemTag);
}

export const createHeader = () => {

    const headerTag = createElem('header');
    const headerH1 = createElem('h1');
    const spanOne = createElem('span');
    const spanTwo = createElem('span');

    headerTag.className = 'headerContainer';
    headerH1.className = 'headerH1';

    spanOne.innerHTML = 'ToDo';
    spanTwo.innerHTML = 'App';

    headerTag.appendChild(headerH1);
    headerH1.appendChild(spanOne);
    headerH1.appendChild(spanTwo);

    return headerTag;
};
