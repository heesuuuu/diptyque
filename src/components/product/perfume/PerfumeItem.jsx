import perfumeMockupData from '../../../data/perfume_updated.json';

const PerfumeItem = () => {
  const perfumeData = perfumeMockupData;
  const { name, description, options } = perfumeData;
  const price = options[0].price;

  return (
    <div className="h-[625px] w-[437px] bg-primary">
      <img src="" alt="" />
      <h2>product name</h2>
      <p>desc</p>
      <span>price</span>
    </div>
  );
};

export default PerfumeItem;
