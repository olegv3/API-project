import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeReview } from '../../../store/reviews';

export default function UserReviewDetails({ id, Spot, stars, review }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    await dispatch(removeReview(id, Spot.id));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        borderBottom: 'lightGray 1px solid',
      }}
    >
      <div>
        <h3 style={{ marginBottom: 0, color: '#ff5d5d' }}>
          {Spot.name} - {stars} stars
        </h3>
        <p style={{ marginTop: 0 }}>{review}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {showConfirm ? (
          <>
            <span>Are you sure?</span>
            <button
              className="demo-user-button"
              onClick={() => {
                handleDelete();
                setShowConfirm(false);
              }}
            >
              Yes
            </button>
            <button
              className="demo-user-button"
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </>
        ) : (
          <button
            className="demo-user-button"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
