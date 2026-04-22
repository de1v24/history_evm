package History_EVM.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.crypto.dsig.spec.XSLTTransformParameterSpec;

@Entity
@Table(name = "computers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Computer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer releaseYear;
    private String designer;

    @Column(length = 5000)
    private String description;

    private Long opsPerSecond;
    private Double memoryKb;
    private Double powerConsumptionKw;

    private String imageUrl;
}
