package History_EVM.demo.dto;

public record ComputerResponseDto(
        Long id,
        String name,
        Integer releaseYear,
        String designer,
        String description,
        Long opsPerSecond,
        Double memoryKb,
        Double powerConsumptionKw,
        String imageUrl
) {
}
