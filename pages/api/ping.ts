export default (req, res) => {
    const timestamp = new Date().toISOString();
    res.status(200).json({text: `Hello at ${timestamp}`});
}