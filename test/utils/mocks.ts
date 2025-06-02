export const mockProducer = {
    id: 1,
    name: 'João Agricultor',
};

export const mockProperty = {
    id: 1,
    name: 'Fazenda Verde',
    area: 200,
    producer: mockProducer,
};

export const mockPlot = {
    id: 1,
    name: 'Talhão 1',
    area: 10.5,
    property: mockProperty,
};
