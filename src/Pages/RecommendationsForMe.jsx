import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from './Loading';
import Cover from '../Components/Cover';
import NoReco from '../assets/no-reco.png'

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(
          `https://suggesto-product-reco-server.vercel.app/recommendationsMe?email=${user.email.toLowerCase()}`,
          {
            credentials: 'include',
          }
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setRecommendations(data);
        } else {
          console.error("Unexpected data format:", data);
          setRecommendations([]);
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.email]);


  if (loading) return <Loading />;

  return (
    <div>
      <Cover
        title="What Others Recommend"
        highlighted="RECOMMENDATIONS FOR YOU"
        current="Recommendations For Me"
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-4xl pacifico-regular text-center font-bold text-orange-500 my-6">
          Recommended by Others
        </h1>

        {recommendations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src={NoReco}
              alt="No recommendations"
              className="w-44 mb-6"
            />
            <p className="text-center opacity-80 text-lg md:text-xl">
              No recommendations found for your queries!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded shadow my-8">
            <table className="min-w-full border border-orange-500 text-sm">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Query & Product</th>
                  <th className="py-3 px-4">Recommender</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((rec) => (
                  <tr
                    key={rec._id}
                    className="border-b border-orange-500 hover:bg-gray-600 transition"
                  >
                    <td className="py-3 px-2 text-center">
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-24 h-20 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="py-3 px-2 font-medium">{rec.title}</td>

                    <td className="py-3 px-2">
                      <span className="block font-semibold text-orange-600">
                        {rec.QueryTitle}
                      </span>
                      <span className="text-sm italic opacity-60">
                        Recommended: {rec.name}
                      </span>
                    </td>

                    <td className="py-3 px-2">{rec.recommenderName}</td>

                    <td className="py-3 px-2" title={rec.reason}>
                      {rec.reason.length > 40
                        ? rec.reason.slice(0, 40) + '...'
                        : rec.reason}
                    </td>

                    <td className="py-3 px-2">
                      {new Date(rec.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsForMe;
