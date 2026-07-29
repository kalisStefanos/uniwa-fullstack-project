
let buildings = [
    {id: 1, name: 'building1'},
    {id: 2, name: 'building2'},
    {id: 3, name: 'building3'}
];

export const getBuildings = (req, res) => {
    res.json(buildings);
};

export const getBuilding = (req, res) => {
    const id = parseInt(req.params.id);
    const obj = buildings.find(o => o.id === id);
    if (obj) {
        return res.status(200).json(obj);
    }
    res.status(404).json({ error: `Object with id ${id} not found` });
};

export const postBuilding = (req, res) => {
    const building = {
        id: buildings.length + 1,
        title: req.body.title
    }
    buildings.push(building);
    res.status(201).json(buildings);
}