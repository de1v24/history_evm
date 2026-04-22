package History_EVM.demo.mapper;


import History_EVM.demo.dto.ComputerResponseDto;
import History_EVM.demo.model.Computer;
import org.springframework.stereotype.Component;

@Component
public class ComputerMapper {

    public ComputerResponseDto toDto(Computer entity) {
        return new ComputerResponseDto(
                entity.getId(),
                entity.getName(),
                entity.getReleaseYear(),
                entity.getDesigner(),
                entity.getDescription(),
                entity.getOpsPerSecond(),
                entity.getMemoryKb(),
                entity.getPowerConsumptionKw(),
                entity.getImageUrl()
        );
    }

    // Из DTO в Entity (для сохранения в базу)
    public Computer toEntity(ComputerResponseDto dto) {
        return new Computer(
                null, // ID сгенерирует база
                dto.name(),
                dto.releaseYear(),
                dto.designer(),
                dto.description(),
                dto.opsPerSecond(),
                dto.memoryKb(),
                dto.powerConsumptionKw(),
                dto.imageUrl()
        );
    }
}