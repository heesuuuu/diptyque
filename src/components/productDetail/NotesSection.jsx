import { useSelector } from 'react-redux';

const NotesSection = () => {
  const { matchingNotesData } = useSelector((state) => state.product);

  return (
    <div className="w-full my-sec-gap-pc">
      <h2 className="detail-sec-title">Story of Our Blend</h2>
      {/* notes 최대개수 5개 : pc는 고정크기, tab,mobile은 swiper로 처리 */}
      <div className="flex gap-6 justify-center items-center">
        {matchingNotesData.map((data) => (
          <div key={data.noteId} className="w-[21.5625rem] h-[21.5625rem]">
            <img src={data.img} alt={data.note} className="h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;
