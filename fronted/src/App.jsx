import { useState, useEffect } from 'react'
import './App.css'

// --- НАСТРОЙКА URL БЭКЕНДА ---
// В облаке мы укажем этот адрес в настройках. 

function App() {
  const [computers, setComputers] = useState([])
  const [loading, setLoading] = useState(true)
  const [compareList, setCompareList] = useState([])
  const [selectedComputerForDetails, setSelectedComputerForDetails] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('yearAsc')
  const [showForm, setShowForm] = useState(false)
  const [newComputer, setNewComputer] = useState({
    name: '', releaseYear: '', designer: '', description: '',
    opsPerSecond: '', memoryKb: '', powerConsumptionKw: '', imageUrl: '/images/default.jpg'
  })

  useEffect(() => {
    fetchComputers()
  }, [])

  const fetchComputers = () => {
    fetch(`/api/computers`)
      .then(response => response.json())
      .then(data => {
        setComputers(data)
        setLoading(false)
      })
      .catch(error => console.error("Ошибка загрузки:", error))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const dataToSend = {
      ...newComputer,
      releaseYear: parseInt(newComputer.releaseYear),
      opsPerSecond: parseInt(newComputer.opsPerSecond),
      memoryKb: parseFloat(newComputer.memoryKb),
      powerConsumptionKw: parseFloat(newComputer.powerConsumptionKw)
    }

    fetch(`/api/computers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(savedComputer => {
      setComputers([...computers, savedComputer])
      setShowForm(false)
      setNewComputer({ name: '', releaseYear: '', designer: '', description: '', opsPerSecond: '', memoryKb: '', powerConsumptionKw: '', imageUrl: '/images/default.jpg' })
    })
    .catch(error => alert("Ошибка сохранения"))
  }

  const handleDelete = (id, name) => {
  // 1. Проверяем, доходит ли клик вообще
  console.log("Попытка удаления ЭВМ с ID:", id); 

  // 2. Если ID по какой-то причине не пришел, мы об этом узнаем
  if (!id) {
    alert("Ошибка: у этой записи нет ID в базе данных");
    return;
  }

  if (window.confirm(`Вы уверены, что хотите удалить "${name}"?`)) {
    fetch(`/api/computers/${id}`, { 
      method: 'DELETE' 
    })
    .then(response => {
      if (response.ok) {
        setComputers(prev => prev.filter(c => c.id !== id));
        setCompareList(prev => prev.filter(c => c.id !== id));
      } else {
        alert("Сервер ответил ошибкой: " + response.status);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Ошибка сети при удалении");
    });
  }
};

  const toggleCompare = (computer) => {
    const isAlreadySelected = compareList.find(c => c.id === computer.id)
    if (isAlreadySelected) {
      setCompareList(compareList.filter(c => c.id !== computer.id))
    } else {
      if (compareList.length >= 2) return alert("Только 2 ЭВМ!")
      setCompareList([...compareList, computer])
    }
  }

  const filteredAndSorted = computers
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.designer.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'yearAsc') return a.releaseYear - b.releaseYear
      if (sortOrder === 'yearDesc') return b.releaseYear - a.releaseYear
      if (sortOrder === 'perfDesc') return b.opsPerSecond - a.opsPerSecond
      return 0
    })

  if (loading) return <div className="loader">Загрузка системы...</div>

  return (
    <div className="container">
      <header>
        <h1>История развития ЭВМ</h1>
        <p>Интерактивное хранилище данных отечественной вычислительной техники</p>
      </header>

      <section className="admin-section">
        <button className="add-toggle-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✖ Закрыть' : '➕ Добавить ЭВМ'}
        </button>
        {showForm && (
          <form className="add-form" onSubmit={handleFormSubmit}>
            <div className="form-grid">
              <input type="text" placeholder="Название" required value={newComputer.name} onChange={e => setNewComputer({...newComputer, name: e.target.value})} />
              <input type="number" placeholder="Год" required value={newComputer.releaseYear} onChange={e => setNewComputer({...newComputer, releaseYear: e.target.value})} />
              <input type="text" placeholder="Конструктор" required value={newComputer.designer} onChange={e => setNewComputer({...newComputer, designer: e.target.value})} />
              <input type="text" placeholder="Фото (/images/имя.jpg)" value={newComputer.imageUrl} onChange={e => setNewComputer({...newComputer, imageUrl: e.target.value})} />
              <input type="number" placeholder="Оп/сек" value={newComputer.opsPerSecond} onChange={e => setNewComputer({...newComputer, opsPerSecond: e.target.value})} />
              <input type="number" step="0.01" placeholder="ОЗУ (КБ)" value={newComputer.memoryKb} onChange={e => setNewComputer({...newComputer, memoryKb: e.target.value})} />
              <input type="number" step="0.01" placeholder="КВт" value={newComputer.powerConsumptionKw} onChange={e => setNewComputer({...newComputer, powerConsumptionKw: e.target.value})} />
            </div>
            <textarea placeholder="История и описание..." required value={newComputer.description} onChange={e => setNewComputer({...newComputer, description: e.target.value})} />
            <button type="submit" className="submit-btn">Сохранить в базу</button>
          </form>
        )}
      </section>

      <div className="controls">
        <input type="text" placeholder="Поиск ЭВМ или инженера..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-bar" />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
          <option value="yearAsc">Старые сначала</option>
          <option value="yearDesc">Новые сначала</option>
          <option value="perfDesc">По мощности</option>
        </select>
      </div>

      {compareList.length === 2 && (
        <div className="compare-panel">
          <div className="compare-header">
            <h2>Сравнение</h2>
            <button onClick={() => setCompareList([])}>Очистить</button>
          </div>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Характеристика</th>
                <th>{compareList[0].name}</th>
                <th>{compareList[1].name}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Год</td><td>{compareList[0].releaseYear}</td><td>{compareList[1].releaseYear}</td></tr>
              <tr>
                <td>Быстродействие</td>
                <td className={compareList[0].opsPerSecond > compareList[1].opsPerSecond ? 'winner' : ''}>{compareList[0].opsPerSecond.toLocaleString()}</td>
                <td className={compareList[1].opsPerSecond > compareList[0].opsPerSecond ? 'winner' : ''}>{compareList[1].opsPerSecond.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Энергия</td>
                <td className={compareList[0].powerConsumptionKw < compareList[1].powerConsumptionKw ? 'winner' : ''}>{compareList[0].powerConsumptionKw} КВт</td>
                <td className={compareList[1].powerConsumptionKw < compareList[0].powerConsumptionKw ? 'winner' : ''}>{compareList[1].powerConsumptionKw} КВт</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <main className="grid">
        {filteredAndSorted.map(computer => {
          const isSelected = compareList.some(c => c.id === computer.id)
          return (
            <div key={computer.id} className={`card ${isSelected ? 'selected' : ''}`}>
              <div className="card-img-container" onClick={() => setSelectedComputerForDetails(computer)}>
                <img src={computer.imageUrl} alt={computer.name} />
                <div className="overlay">Инфо</div>
              </div>
              <div className="card-content">
                <h3>{computer.name}</h3>
                <span className="badge">{computer.releaseYear} г.</span>
                <div className="card-actions">
                  <button className={`comp-btn ${isSelected ? 'active' : ''}`} onClick={() => toggleCompare(computer)}>
                    {isSelected ? 'Убрать' : 'Сравнить'}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(computer.id, computer.name)}>🗑</button>
                </div>
              </div>
            </div>
          )
        })}
      </main>

      {selectedComputerForDetails && (
        <div className="modal-mask" onClick={() => setSelectedComputerForDetails(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setSelectedComputerForDetails(null)}>✖</button>
            <div className="modal-layout">
              <img src={selectedComputerForDetails.imageUrl} alt={selectedComputerForDetails.name} />
              <div className="modal-info">
                <h2>{selectedComputerForDetails.name}</h2>
                <p><strong>Конструктор:</strong> {selectedComputerForDetails.designer}</p>
                <p className="modal-desc">{selectedComputerForDetails.description}</p>
                <div className="modal-stats">
                  <div><strong>Оп/сек:</strong> {selectedComputerForDetails.opsPerSecond.toLocaleString()}</div>
                  <div><strong>Память:</strong> {selectedComputerForDetails.memoryKb} КБ</div>
                  <div><strong>Мощность:</strong> {selectedComputerForDetails.powerConsumptionKw} КВт</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App