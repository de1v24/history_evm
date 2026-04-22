package History_EVM.demo.service;


import History_EVM.demo.dto.ComputerResponseDto;
import History_EVM.demo.mapper.ComputerMapper;
import History_EVM.demo.model.Computer;
import History_EVM.demo.repository.ComputerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Автоматически создает конструктор для внедрения зависимостей
public class ComputerService {

    private final ComputerRepository computerRepository;
    private final ComputerMapper computerMapper;

    public List<ComputerResponseDto> getAllComputers() {
        return computerRepository.findAll().stream()
                .map(computerMapper::toDto)
                .collect(Collectors.toList());
    }

    public ComputerResponseDto getComputerById(Long id) {
        Computer computer = computerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ЭВМ не найдена"));
        return computerMapper.toDto(computer);
    }

    // Метод для создания новой ЭВМ
    public ComputerResponseDto createComputer(ComputerResponseDto dto) {
        Computer entity = computerMapper.toEntity(dto);
        Computer savedEntity = computerRepository.save(entity);
        return computerMapper.toDto(savedEntity);
    }

    public void deleteComputer(Long id) {
        if (!computerRepository.existsById(id)) {
            throw new RuntimeException("ЭВМ не найдена");
        }
        computerRepository.deleteById(id);
    }
}