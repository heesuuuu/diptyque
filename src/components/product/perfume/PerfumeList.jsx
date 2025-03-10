import perfumeMockupData from '../../../data/perfume_updated.json';
import PerfumeItem from './PerfumeItem';

const PerfumeList = () => {
  const perfumeData = perfumeMockupData;

  return (
    <>
      <div className="grid grid-cols-3 gap-28">
        {perfumeData.map((item) => (
          <PerfumeItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default PerfumeList;
