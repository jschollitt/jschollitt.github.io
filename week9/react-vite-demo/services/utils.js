function getRandomImage(width, height, index=1) {
    return `https://picsum.photos/${width}/${height}?random=${index}`;
}

export { getRandomImage };