'use client'

import React, { useEffect, useState } from 'react'

const page = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('/api/teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Erro ao carregar os times:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (loading) return <p>Carregando times...</p>;
    return (
    <div>page</div>
  )
}

export default page